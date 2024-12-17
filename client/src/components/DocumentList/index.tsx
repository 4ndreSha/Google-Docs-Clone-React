import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [editingDocId, setEditingDocId] = useState(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [sortedDocuments, setSortedDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteDocId, setDeleteDocId] = useState(null);
  const navigate = useNavigate();

  // Initialize socket connection
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Fetch document list
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!socket || !username) return;

    socket.emit("get-document-list", { username });

    socket.on("document-list", (documentList) => {
      setDocuments(
        documentList.map((doc) => ({
          id: doc.id,
          title: doc.title || "Untitled",
          date: new Date(doc.updatedAt).toISOString(),
        }))
      );
    });

    return () => {
      socket.off("document-list");
    };
  }, [socket]);

  // Filter and sort documents
  useEffect(() => {
    const filteredDocuments = documents.filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const _sortedDocuments = [...filteredDocuments].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      return a.title.localeCompare(b.title);
    });

    setSortedDocuments(_sortedDocuments);
  }, [searchQuery, sortBy, documents]);

  // Handlers
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleDelete = (id) => {
    setDeleteDocId(id);
    setShowModal(true);
  };
  const confirmDelete = () => {
    const username = localStorage.getItem("username");
    if (!socket || !username) return;

    socket.emit("delete-document", { id: deleteDocId, username });
    setDocuments((prevDocs) =>
      prevDocs.filter((doc) => doc.id !== deleteDocId)
    );
    setShowModal(false);
    setDeleteDocId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteDocId(null);
  };

  const handleEditClick = (id, title) => {
    setEditingDocId(id);
    setNewTitle(title);
  };

  const handleSaveTitle = (id) => {
    if (!socket) return;
    socket.emit("edit-document-title", { id, newTitle });

    setDocuments((prevDocs) =>
      prevDocs.map((doc) => (doc.id === id ? { ...doc, title: newTitle } : doc))
    );
    setEditingDocId(null);
  };

  return (
    <section className="document-list">
      <div className="document-list-container">
        {/* Search and Sort */}
        <div className="search-sort-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search documents"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select
            className="sort-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        {/* Document Table */}
        <table className="document-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedDocuments.length > 0 ? (
              sortedDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td className="document-title">
                    {editingDocId === doc.id ? (
                      <div className="edit-title-container">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onBlur={() => handleSaveTitle(doc.id)}
                          autoFocus
                        />
                        <button
                          className="save-button"
                          onClick={() => handleSaveTitle(doc.id)}
                          title="Save"
                        >
                          ✔
                        </button>
                      </div>
                    ) : (
                      <span onClick={() => handleEditClick(doc.id, doc.title)}>
                        {doc.title}
                      </span>
                    )}
                  </td>
                  <td className="document-date">
                    {new Date(doc.date).toLocaleString()}
                  </td>
                  <td className="document-actions">
                    <button
                      className="open-button"
                      onClick={() => navigate(`/document/${doc.id}`)}
                    >
                      Open
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(doc.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No documents found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Window */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h5>Confirm Deletion</h5>
              <p>Are you sure you want to delete this document?</p>
              <div className="modal-buttons">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocumentList;
