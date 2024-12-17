import React from "react";
import DocumentList from "../../components/DocumentList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Home() {
  const documents = [
    { id: "1", title: "Document A", date: "2023-12-01" },
    { id: "2", title: "Document B", date: "2023-12-05" },
    {
      id: "3",
      title:
        "Documenda f daufy t17sad dkjasgfudg asoiudfg apiud gfad fk h3  19f87h 0ew7da hf0uah edsf8uyhodfyg9asdgfyasdt C",
      date: "2023-11-20",
    },
    { id: "4", title: "Document D", date: "2023-12-15" },
  ];
  return (
    <>
      <Header />
      <DocumentList documents={documents} />
      <Footer />
    </>
  );
}

export default Home;
