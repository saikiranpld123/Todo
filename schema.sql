CREATE TABLE `NODEJSAPP`.`TODO_ITEMS` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `TITLE` VARCHAR(220) NOT NULL,
    `DESCRIPTION` TEXT NOT NULL,
    `COMPLETED` BOOLEAN NOT NULL,
    `CREATED_AT` TIMESTAMP NOT NULL,
    PRIMARY KEY (`ID`)
) ENGINE = INNODB;