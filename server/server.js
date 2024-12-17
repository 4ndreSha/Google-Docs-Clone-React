const express = require("express");
const mongoose = require("mongoose");
const Document = require("./Document");
const User = require("./User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authService = require("./services/authService");

mongoose.connect("mongodb://127.0.0.1/google-docs-clone");

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  socket.on("register", async ({ username, password }) => {
    try {
      const result = await authService.register(username, password);
      socket.emit("registerSuccess", {
        message: "Registered successfully",
        user: result,
      });
    } catch (err) {
      socket.emit("error", { message: err.message });
    }
  });

  socket.on("login", async ({ username, password }) => {
    try {
      const token = await authService.login(username, password);

      socket.emit("loginSuccess", {
        message: "Logged in successfully",
        username,
      });

      require("socket.io-cookie")(io, {
        cookieName: "token",
        secret: token,
        httpOnly: true,
      });
    } catch (err) {
      socket.emit("error", { message: err.message });
    }
  });

  socket.on("logout", () => {
    try {
      socket.emit("logoutSuccess", { message: "Logged out successfully" });
    } catch (err) {
      socket.emit("error", { message: err.message });
    }
  });

  socket.on("add-document", async (documentId, username) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        socket.emit("error", { message: "User not found" });
        return;
      }

      if (!user.documents.includes(documentId)) {
        user.documents = [...user.documents, documentId];
        await user.save();
      }

      console.log(`Document ${documentId} added to user ${username}`);
      socket.emit("document-added", { message: "Document added successfully" });
    } catch (err) {
      console.error("Error adding document:", err.message);
      socket.emit("error", { message: "Failed to add document" });
    }
  });

  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("recieve-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });

  socket.on("get-document-list", async ({ username }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        socket.emit("error", { message: "User not found" });
        return;
      }

      const documentList = [];

      for (const documentId of user.documents) {
        const document = await Document.findById(documentId).select(
          "_id title createdAt updatedAt"
        );

        if (document) {
          documentList.push({
            id: document._id,
            title: document.title || "Untitled",
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
          });
        }
      }

      socket.emit("document-list", documentList);
    } catch (err) {
      console.error("Error fetching document list:", err.message);
      socket.emit("error", { message: "Failed to fetch document list" });
    }
  });

  socket.on("delete-document", async ({ id, username }) => {
    try {
      await Document.findByIdAndDelete(id);

      const user = await User.findOne({ username });
      if (user) {
        user.documents = user.documents.filter((docId) => docId !== id);
        await user.save();
      }

      socket.emit("document-deleted", {
        id,
        message: "Document deleted successfully",
      });
      console.log(`Document ${id} deleted successfully for user ${username}`);
    } catch (err) {
      console.error("Error deleting document:", err.message);
      socket.emit("error", { message: "Failed to delete document" });
    }
  });

  socket.on("edit-document-title", async ({ id, newTitle }) => {
    try {
      const updatedDocument = await Document.findByIdAndUpdate(
        id,
        { title: newTitle },
        { new: true }
      );

      if (!updatedDocument) {
        socket.emit("error", { message: "Document not found" });
        return;
      }

      console.log(`Document ${id} title updated to: ${newTitle}`);

      // Сообщаем клиентам об успешном обновлении
      socket.emit("document-title-updated", {
        id,
        newTitle: updatedDocument.title,
      });
    } catch (err) {
      console.error("Error updating document title:", err.message);
      socket.emit("error", { message: "Failed to update document title" });
    }
  });

  socket.on("disconnect", () => {
    //console.log("A user disconnected");
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({
    _id: id,
    title: `New Document`,
    data: defaultValue,
  });
}
