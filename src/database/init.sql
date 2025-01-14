USE emargement_db;

CREATE TABLE utilisateurs (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              name VARCHAR(100),
                              email VARCHAR(100) UNIQUE,
                              password VARCHAR(255),
                              role ENUM('formateur', 'etudiant')
);

CREATE TABLE sessions (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          title VARCHAR(255),
                          date DATE,
                          formateur_id INT,
                          FOREIGN KEY (formateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE emargements (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             session_id INT,
                             etudiant_id INT,
                             status BOOLEAN,
                             FOREIGN KEY (session_id) REFERENCES sessions(id),
                             FOREIGN KEY (etudiant_id) REFERENCES utilisateurs(id)
);
