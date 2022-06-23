CREATE SCHEMA catalogo; 
use catalogo; 
CREATE TABLE `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contrasenia` varchar(200) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `dni` int(10) unsigned NOT NULL,
  `foto_usuario` varchar(1000) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);
CREATE TABLE `productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `foto` varchar(1000) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(2000) NOT NULL,
  `fecha` date NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_usuario` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuarioProductos` (`id_usuario`),
  CONSTRAINT `idUsuarioProductos` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE `comentarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comentario` varchar(3000) NOT NULL,
  `id_usuario` int(10) unsigned NOT NULL,
  `fecha` date NOT NULL,
  `id_producto` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuarioComentarios` (`id_usuario`),
  KEY `idProductoComentarios` (`id_producto`),
  CONSTRAINT `idProductoComentarios` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idUsuarioComentarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
); 
CREATE TABLE `seguidor_seguidos` (
  `id_seguidor` int(10) unsigned NOT NULL,
  `id_seguido` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `idSeguido` (`id_seguido`),
  KEY `idSeguidor` (`id_seguidor`),
  CONSTRAINT `idSeguido` FOREIGN KEY (`id_seguido`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idSeguidor` FOREIGN KEY (`id_seguidor`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/*Inserts*/

INSERT INTO `catalogo`.`usuarios` (`nombre_usuario`, `email`, `contrasenia`, `fecha_nacimiento`, `dni`, `foto_usuario`) VALUES ('juan', 'juancruz@gmail.com', '$2a$10$nOv/Gmchq69SiYwBKwWjL.P3tlUA23eq.ZdxSNwoQ8ew9fp1FEXBa', '2022-06-24', '44554545', 'profilePic-1655929464793.jpg');
INSERT INTO `catalogo`.`usuarios` (`nombre_usuario`, `email`, `contrasenia`, `fecha_nacimiento`, `dni`, `foto_usuario`) VALUES ('rafa14', 'rafa@gmail.com', '$2a$10$OkfzJbtRiJudsdYOeQ6ireEkktWu5uTHOcr.CpCu5opzm8iotJepS', '2022-06-23', '44554545', 'profilePic-1655984651346.jpg');
INSERT INTO `catalogo`.`usuarios` (`nombre_usuario`, `email`, `contrasenia`, `fecha_nacimiento`, `dni`, `foto_usuario`) VALUES ('mateo', 'mateo@gmail.com', '$2a$10$6gmYoWz.VTEACCuCfZufjOU8f.C9iN927gjhZ2FOr8QtS6BR1wFsi', '2022-06-23', '44554545', 'profilePic-1655985086246.jpg');

INSERT INTO `catalogo`.`productos` (`foto`, `nombre`, `descripcion`, `fecha`, `id_usuario`) VALUES ('foto-1655986881556.webp', 'Vans Old Skool', 'Ideales para todo tipo de rutinas y actividades. Su diseño y confort las convierten en el calzado perfecto.  Suela de goma Las zapatillas fabricadas con suela de goma tienen mayor resistencia al desgaste, son naturalmente impermeables y flexibles, y además extienden la estabilidad de la contracción.', '2022-06-23', '1');
INSERT INTO `catalogo`.`productos` (`foto`, `nombre`, `descripcion`, `fecha`, `id_usuario`) VALUES ('foto-1655987930621.jpg', 'Air Jordan Adapt 11', 'El Air Jordan 11 Adapt ofrece un enfoque único a la zapatilla de baloncesto tradicional. La parte superior está compuesta por su envoltura de charol por excelencia, mientras que se mezcla con un material textil ligero y un Jumpman carmesí en el talón. La entresuela es donde las cosas se ponen interesantes, con botones que se iluminan para ayudar a ajustar el ajuste del zapato al gusto del usuario. Como siempre, la suela tiene una placa de fibra de carbono para mayor estabilidad en la cancha.', '2022-06-23', '2');

INSERT INTO `catalogo`.`comentarios` (`comentario`, `id_usuario`, `fecha`, `id_producto`) VALUES ('Muy buen produto', '2', '2022-06-23', '1');
INSERT INTO `catalogo`.`comentarios` (`comentario`, `id_usuario`, `fecha`, `id_producto`) VALUES ('De los mejores productos', '1', '14/11/2003', '1');
