CREATE SCHEMA catalogo; 
use catalogo; 
CREATE TABLE `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contrasenia` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `dni` int(10) unsigned NOT NULL,
  `foto_usuario` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `productos` (
  `id_producto` int(10) unsigned NOT NULL,
  `foto` varchar(1000) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(2000) NOT NULL,
  `fecha` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Id_usuario` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `idUsuarioProductos` (`Id_usuario`),
  CONSTRAINT `idUsuarioProductos` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE `comentarios` (
  `id_comentarios` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comentario` varchar(3000) NOT NULL,
  `id_usuario` int(10) unsigned NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_comentarios`),
  KEY `idUsuario` (`id_usuario`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
); 
CREATE TABLE `seguidor_seguidos` (
  `id_seguidor` int(10) unsigned NOT NULL,
  `id_seguido` int(10) unsigned NOT NULL,
  `id_relacion` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_relacion`),
  KEY `idSeguido` (`id_seguido`),
  KEY `idSeguidor` (`id_seguidor`),
  CONSTRAINT `idSeguido` FOREIGN KEY (`id_seguido`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idSeguidor` FOREIGN KEY (`id_seguidor`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);