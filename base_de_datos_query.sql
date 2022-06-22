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
INSERT INTO `catalogo`.`usuarios` (`nombre_usuario`, `email`, `contrasenia`, `fecha_nacimiento`, `dni`, `foto_usuario`) VALUES ('rafarodri', 'rafarodri@gmail.com', '12345678', '21/12/2011', '50943212', 'rafa.jpg');
INSERT INTO `catalogo`.`usuarios` (`nombre_usuario`, `email`, `contrasenia`, `fecha_nacimiento`, `dni`, `foto_usuario`) VALUES ('gonazoljimenez', 'gonzajime@gmail.com', '12345678', '15/8/2020', '60431232', 'gonza.jpg');

INSERT INTO `catalogo`.`productos` (`foto`, `nombre`, `descripcion`, `fecha`, `id_usuario`) VALUES ('dior.jpg', 'Jordan Dior', 'Jordan dior', '6/10/2022', '1');
INSERT INTO `catalogo`.`productos` (`foto`, `nombre`, `descripcion`, `fecha`, `id_usuario`) VALUES ('off.jpg', 'Nike Off White', 'Nike off white', '6/10/2022', '2');

INSERT INTO `catalogo`.`comentarios` (`comentario`, `id_usuario`, `fecha`, `id_producto`) VALUES ('Alto producto', '1', '14/11/202', '1');
INSERT INTO `catalogo`.`comentarios` (`comentario`, `id_usuario`, `fecha`, `id_producto`) VALUES ('Que buen producto', '2', '14/11/2003', '2');

