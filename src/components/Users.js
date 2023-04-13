import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const API = "https://flaskapi-8sww.onrender.com";

export const Users = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [creditos, setCreditos] = useState("");

  const [editing, setEditing] = useState(false); //para cambiar el estado del formulario
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/matriculas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          asignatura,
          creditos,
        }),
      });
      await res.json(); //conversion de los datos es asynchronous
    } else {
      const res = await fetch(`${API}/matriculas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          asignatura,
          creditos,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();

    setName("");
    setEmail("");
    setAsignatura("");
    setCreditos("");
    nameInput.current.focus();
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/matriculas`);
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const userResponse = true;
    if (userResponse) {
      const res = await fetch(`${API}/matriculas/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/matriculas/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Restablecer formulario
    setName(data.name);
    setEmail(data.email);
    setAsignatura(data.asignatura);
    setCreditos(data.creditos);
    nameInput.current.focus();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="User's Email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setAsignatura(e.target.value)}
              value={asignatura}
              className="form-control"
              placeholder="Asignatura"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={(e) => setCreditos(e.target.value)}
              value={creditos}
              className="form-control"
              placeholder="Creditos"
            />
          </div>
          <div className="container">
            <button className="btn btn-primary btn-block">
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {editing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Asignatura</th>
              <th>Creditos</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.asignatura}</td>
                <td>{user.creditos}</td>
                <td>
                  <div className="btn-group">
                    <Button variant="info" onClick={(e) => editUser(user._id)}>
                      Editar
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => {
                        setId(user._id);
                        handleShow();
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            <Modal show={show} onHide={handleClose} keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>Confirmar para para eliminar el usuario</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    deleteUser(id);
                    handleClose();
                  }}
                >
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        </table>
      </div>
    </div>
  );
};
