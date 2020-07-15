CREATE SCHEMA IF NOT EXISTS `radiodb_eo`;
SET FOREIGN_KEY_CHECKS = 0; 

CREATE TABLE IF NOT EXISTS `radiodb_eo`.`ro_category` (
    `category_id` INT NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`category_id`),
    UNIQUE INDEX `category_name_UNIQUE` (`category_name` ASC)
);

CREATE TABLE IF NOT EXISTS `radiodb_eo`.`ro_program` (
    `program_id` INT NOT NULL AUTO_INCREMENT,
    `program_title` VARCHAR(45) NOT NULL,
    `program_description` TEXT(10000) NULL,
    `program_image` VARCHAR(255) NULL,
    `ro_category_category_id` INT NULL DEFAULT NULL,
    PRIMARY KEY (`program_id`),
    INDEX `fk_ro_program_ro_category1_idx` (`ro_category_category_id` ASC),
    UNIQUE INDEX `program_title_UNIQUE` (`program_title` ASC),
    CONSTRAINT `fk_ro_program_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `radiodb_eo`.`ro_category` (`category_id`) ON DELETE
    SET
        NULL ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `radiodb_eo`.`ro_admin` (
    `admin_id` INT NOT NULL AUTO_INCREMENT,
    `admin_user` VARCHAR(16) NOT NULL,
    `admin_email` VARCHAR(255) NOT NULL,
    `admin_password` VARCHAR(32) NOT NULL,
    PRIMARY KEY (`admin_id`),
    UNIQUE INDEX `admin_email_UNIQUE` (`admin_email` ASC)
);

CREATE TABLE IF NOT EXISTS `radiodb_eo`.`ro_podcast` (
    `podcast_id` INT NOT NULL AUTO_INCREMENT,
    `podcast_title` VARCHAR(255) NOT NULL,
    `podcast_duration` VARCHAR(45) NULL,
    `podcast_description` TEXT(10000) NULL,
    `podcast_image` VARCHAR(255) NULL,
    `podcast_mp3` VARCHAR(255) NOT NULL,
    `podcast_creation_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    `ro_program_program_id` INT NOT NULL,
    `ro_category_category_id` INT NULL DEFAULT NULL,
    PRIMARY KEY (`podcast_id`, `ro_program_program_id`),
    INDEX `fk_ro_podcast_ro_program1_idx` (`ro_program_program_id` ASC),
    INDEX `fk_ro_podcast_ro_category1_idx` (`ro_category_category_id` ASC),
    CONSTRAINT `fk_ro_podcast_ro_program1` FOREIGN KEY (`ro_program_program_id`) REFERENCES `radiodb_eo`.`ro_program` (`program_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_ro_podcast_ro_category1` FOREIGN KEY (`ro_category_category_id`) REFERENCES `radiodb_eo`.`ro_category` (`category_id`) ON DELETE
    SET
        NULL ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `radiodb_eo`.`ro_animator` (
    `animator_id` INT NOT NULL AUTO_INCREMENT,
    `animator_firstname` VARCHAR(45) NOT NULL,
    `animator_lastname` VARCHAR(45) NOT NULL,
    `animator_description` TEXT(10000) NULL,
    `animator_image` VARCHAR(255) NULL,
    PRIMARY KEY (`animator_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `radiodb_eo`.`ro_tag` (
    `tag_id` INT NOT NULL AUTO_INCREMENT,
    `tag_name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`tag_id`),
    UNIQUE INDEX `tag_name_UNIQUE` (`tag_name` ASC)
);

CREATE TABLE IF NOT EXISTS `radiodb_eo`.`ro_animator_has_ro_program` (
    `ro_animator_animator_id` INT NOT NULL,
    `ro_program_program_id` INT NOT NULL,
    PRIMARY KEY (
        `ro_animator_animator_id`,
        `ro_program_program_id`
    ),
    INDEX `fk_ro_animator_has_ro_program_ro_program1_idx` (`ro_program_program_id` ASC),
    INDEX `fk_ro_animator_has_ro_program_ro_animator1_idx` (`ro_animator_animator_id` ASC),
    CONSTRAINT `fk_ro_animator_has_ro_program_ro_animator1` FOREIGN KEY (`ro_animator_animator_id`) REFERENCES `radiodb_eo`.`ro_animator` (`animator_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `fk_ro_animator_has_ro_program_ro_program1` FOREIGN KEY (`ro_program_program_id`) REFERENCES `radiodb_eo`.`ro_program` (`program_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `radiodb_eo`.`ro_podcast_has_ro_animator` (
    `ro_podcast_podcast_id` INT NOT NULL,
    `ro_animator_animator_id` INT NOT NULL,
    PRIMARY KEY (
        `ro_podcast_podcast_id`,
        `ro_animator_animator_id`
    ),
    INDEX `fk_ro_podcast_has_ro_animator_ro_animator1_idx` (`ro_animator_animator_id` ASC),
    INDEX `fk_ro_podcast_has_ro_animator_ro_podcast1_idx` (`ro_podcast_podcast_id` ASC),
    CONSTRAINT `fk_ro_podcast_has_ro_animator_ro_podcast1` FOREIGN KEY (`ro_podcast_podcast_id`) REFERENCES `radiodb_eo`.`ro_podcast` (`podcast_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `fk_ro_podcast_has_ro_animator_ro_animator1` FOREIGN KEY (`ro_animator_animator_id`) REFERENCES `radiodb_eo`.`ro_animator` (`animator_id`) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO
    `ro_animator`
VALUES
    (1, 'Thierry', 'AGUILO', 'description', ''),
    (2, 'Claire', 'BREEDS', 'description', ''),
    (
        3,
        'Geoffrey',
        'CARRERE',
        'description',
        ''
    ),
    (
        4,
        'Jean-Pierre',
        'ETRAMPES',
        'Bien qu’ayant réalisé de nombreux bâtiments publics et notamment l’Hôtel de de Région à Toulouse Jean-Pierre Estrampes a toujours été intéressé par les questions sociales et le logement, d’ailleurs il s’est investi ces deux dernières années dans un projet de logements économiques à partir de containers maritimes avec un ami architecte franco-américain Pascal Hofstein. Par sa formation dans une célèbre école d’’art américaine, Cranbrook Academy, notre chroniqueur a une approche ouverte de son métier de constructeur, incorporant design et autres disciplines artistiques. Il a tout au long de sa pratique d’architecte, écrit en parallèle des articles sur l’architecture dans des revues françaises et étrangères. Il a aussi pendant vingt ans enseigné l’architecture, l’urbanisme et l’histoire de l’art à l’Ecole d’Architecture de Montpellier.',
        'https://www.espritoccitanie.fr/upload/equipes/normal/5da70de0798055.27968656_mini.jpg'
    ),
    (
        5,
        'Irène',
        'FINKEL',
        'description',
        'https://www.espritoccitanie.fr/upload/equipes/mini/5b1818bb4c1788.25482474_mini.jpg'
    ),
    (
        6,
        'Eric',
        'HEBEL',
        'Curieux par nature, Eric a découvert le rock progressif il y a plus de 20 ans. Aujourd\'hui, il souhaite vous transporter dans cet univers musical singulier. C\'est pour cela qu\'Eric a imaginé "Progressif", émission qu\'il écrit, qu\'il produit et qu\'il anime tous les 15 jours sur Esprit Occitanie le lundi entre 19h00 et 20h00.',
        'https://www.espritoccitanie.fr/upload/equipes/normal/5e218082398601.70192371_mini.png'
    ),
    (
        7,
        'Jacques',
        'LAVERGNE',
        'description',
        'https://www.espritoccitanie.fr/upload/equipes/mini/5c90e4024049c3.78233873_mini.jpg'
    ),
    (8, 'Marie', 'LE BERRE', 'description', ''),
    (
        9,
        'Benjamin',
        'LECOUSIN',
        'description',
        ''
    ),
    (
        10,
        'Monique',
        'MARQUE',
        'description',
        'https://www.espritoccitanie.fr/upload/equipes/normal/5e5d14d1c67c71.92510370_mini.jpg'
    ),
    (
        11,
        'Maxime',
        'MAURY',
        'Maxime Maury, économiste et Directeur Honoraire de la Banque de France.',
        'https://www.espritoccitanie.fr/upload/equipes/normal/5c78f3366ec535.41966685_mini.jpg'
    ),
    (
        12,
        'Jean-Paul',
        'MIRAT',
        'description12',
        'https://www.espritoccitanie.fr/upload/equipes/mini/5ad602b842c3f9.13863355_mini.jpg'
    ),
    (13, 'Léo', 'MOLINIE', 'description13', 'image13'),
    (
        14,
        'Alain',
        'SERGUES',
        'Alain Sergues anime Classique Café tous les mercredis de 13h30 jusqu\'à 14h00',
        'https://www.espritoccitanie.fr/upload/equipes/mini/5e55269443b8b8.13909342_mini.jpg'
    ),
    (
        15,
        'Philippe',
        'TROUSLARD',
        'Un vécu d\’Ingénieur dans l\’Aviation Civile, pilote Une grande passion à faire partager, celle de la Navigation Aérienne, de l\’Aéronautique Il...',
        'https://www.espritoccitanie.fr/upload/equipes/mini/5adb4b5ed8a7d0.34656483_mini.jpg'
    ),
    (
        16,
        'Romain',
        'GALTHIE',
        'Animateur de L\'émission Occiforme. Interviews de personnalités dans les domaines du sport, de la santé et du bien-être.',
        'https://www.espritoccitanie.fr/upload/equipes/mini/5aa7fecccc9857.16680504_mini.jpg'
    ),
    (17, 'Lilou', 'Shana', 'description17', ''),
    (18, 'Maria', 'Maria', 'description18', ''),
    (
        19,
        'Sophie',
        'VOINIS',
        'Sophie Voinis est journaliste, présentatrice et animatrice. Elle est diplômée de l\'université Emerson, à Boston, en journalisme et communication où elle a débuté sa carrière en radio et en télévision.
De retour en France, elle a travaillé 16 ans en télévision à Toulouse en tant que journaliste et présentatrice du journal du soir mais aussi rédactrice en chef et productrice du magazine de la santé et du magazine Aerospace.
Elle est egalement souvent sollicitée pour animer des conférences et tables rondes en français et en anglais et assure des sessions de mediatraining dans 2 langues.',
        'https://www.espritoccitanie.fr/upload/equipes/normal/5dc533f3f2e265.30564208_mini.jpg'
    );

INSERT INTO `ro_category` VALUES (7,'Aéronautique'),(10,'Architecture - Urbanisme'),(6,'Culture'),(1,'Economie'),(5,'Environnement'),(9,'Multithèmes'),(3,'Musique'),(2,'Politique'),(8,'Santé'),(4,'Société'),(11,'Sport');
INSERT INTO
    `ro_program`
VALUES
    (
        1,
        'Cap e Cap',
        'Le portrait en creux d’une/d’un invité durant une heure d’entretien, pour parler de sa vie, ses goûts, ses choix, son œuvre, ses projets…\n\nParfois, l’émission explore un thème unique illustré par plusieurs invités.',
        'https://www.espritoccitanie.fr/upload/podcasts/photos/normal/5eec8ec4060ba8.36675449_mini.jpg',
        4
    ),
    (
        2,
        'Progressif',
        'Le rock et autres musiques dites progressives.',
        '',
        3
    ),
    (
        3,
        'Mon beau quartier',
        'La parole est aux habitants des quartiers qualifiés de « difficiles » : leur quotidien, leurs difficultés, leurs réussites, leurs traditions.',
        '',
        4
    ),
    (
        4,
        'Patchwork',
        'Des chroniques diverses et variées : droit, vin, finances, lecture d’un livre, bien être au travail…',
        '',
        9
    ),
    (
        5,
        'Economica',
        'L’actualité économique commentée par deux chroniqueurs spécialisés.',
        '',
        1
    ),
    (
        6,
        'Verts de Terre',
        'La sociologie de l’environnement par les étudiants spécialisés de l’Université Jean Jaurès.',
        'https://www.espritoccitanie.fr/upload/podcasts/photos/normal/5dfa2e96938c81.46834306_mini.PNG',
        5
    ),
    (
        7,
        'Où vivrons nous demain',
        'Urbanisme et architecture.',
        '',
        10
    ),
    (
        8,
        'Ma Préférence',
        'L’actualité de la culture à Toulouse et sa région : cinéma, théâtre, littérature d’expression française et occitane, musique, restaurant, expositions…',
        '',
        6
    ),
    (
        9,
        'Ça va mieux',
        'Certains aspects de l’actualité, politique, sociale, nationale, internationale, commentés par une équipe de chroniqueurs chevronnés.',
        '',
        2
    ),
    (
        10,
        'Résilience',
        'L’état de la Terre, le changement climatique, la déplétion des matières premières, l’avenir de nos civilisations par deux spécialistes.',
        '',
        5
    ),
    (
        11,
        'Ainsi va la vie',
        'Un invité, sa jeunesse, ses débuts dans la vie…',
        'https://www.espritoccitanie.fr/upload/emissions/main/5a69c99bcf2cd7.23829987.jpg?=1594648713',
        4
    ),
    (
        12,
        'L’oiseau Blanc',
        'Le monde de l’aéronautique sous tous ses aspects.',
        'https://www.espritoccitanie.fr/upload/podcasts/photos/normal/5e7364766e48c2.31135383_mini.jpg',
        7
    ),
    (
        13,
        'Bas Pla',
        'Les médecines alternatives et asiatiques.',
        'https://www.espritoccitanie.fr/upload/emissions/main/5ad60304875070.80527084.jpg',
        8
    ),
    (
        14,
        'Open Rap',
        'A la découverte du rap et de ses interprètes.',
        'https://www.espritoccitanie.fr/upload/emissions/main/5b917299aa7619.87180434.jpg',
        3
    ),
    (
        15,
        'Classique café',
        'Le moment de la musique classique.',
        '',
        3
    ),
    (
        16,
        'On avance',
        'Les nouveautés, les défis, les avancées majeures dans tous les domaines.',
        '',
        4
    ),
    (
        17,
        'La vie étudiante à Toulouse',
        'Le quotidien des étudiants : bons plans, sorties, conseils tous azimuts…',
        '',
        4
    ),
    (
        18,
        'Occiforme',
        'Le sport versus préparation, diététique, entrainement, coaching, santé…',
        'https://www.espritoccitanie.fr/upload/podcasts/photos/normal/5e1f14398142f5.19335661_mini.jpg',
        11
    );

INSERT INTO
    `ro_animator_has_ro_program`(
        `ro_animator_animator_id`,
        `ro_program_program_id`
    )
VALUES
    (14, 15),
    (15, 12),
    (16, 18),
    (3, 6),
    (7, 1),
    (7, 9),
    (7, 8),
    (5, 8),
    (7, 5),
    (11, 5),
    (7, 10),
    (11, 10),
    (5, 11),
    (12, 13),
    (9, 3),
    (6, 4),
    (8, 4),
    (2, 4),
    (10, 4),
    (13, 14),
    (4, 7),
    (6, 2),
    (19, 16);

INSERT INTO
    `radiodb_eo`.`ro_podcast` (
        `podcast_title`,
        `podcast_duration`,
        `podcast_description`,
        `podcast_image`,
        `podcast_mp3`,
        `podcast_creation_date`,
        `ro_program_program_id`,
        `ro_category_category_id`
    )
VALUES
    (
        'CAP E CAP / ETIENNE GARCIA',
        '42 min',
        'Jacques LAVERGNE interwieve Etienne GARCIA Président de festivals cinématographique',
        'https://www.espritoccitanie.fr/upload/podcasts/photos/main/5eec8ec4060ba8.36675449_mini.jpg',
        'http://esprit-occitanie.fr/emissions/capecap/2020-06-22capecap(etiennegarcia).mp3',
        '2020-07-22 00:00:00',
        1,
        4
    ),
    (
        'CAP E CAP / YANN ARTHUS-BERTRAND',
        '43 min',
        'Jacques LAVERGNE et Yann Arthus-Bertrand au festival de Luchon',
        'https://www.espritoccitanie.fr/upload/podcasts/photos/main/5eec8ec4060ba8.36675449_mini.jpg',
        'http://esprit-occitanie.fr/emissions/capecap/2020-06-15capecap(yannarthusbertrand).mp3',
        '2020-07-22 00:00:00',
         1,
        4
    ),

    (
        'PROGRESSIF',
        '55 min',
        'Aujourd\'hui dans Progressif Eric Hebel nous parlera de plusieurs groupes tel que Pink Floyd, Gazpacho ou encore Supertramp.',
        '',
        'http://www.esprit-occitanie.fr/emissions/progressif/2020-03-02progressif.mp3',
        '2020-03-02 00:00:00',
          2,
        4
    ),
    (
        'MON BEAU QUARTIER',
        '35 min',
        'Mon Beau Quartier, la nouvelle émission de Benjamin Lecousin, son but, donner la parole à l\'association \"L\'École et Nous\" ainsi qu\'aux habitants du quartier de Bellefontaine.',
        '',
        'http://esprit-occitanie.fr/emissions/monbeauquartier/2019-12-03monbeauquartier.mp3',
        '2019-12-03 00:00:00',
          2,
        4
    ),
    (
        'MON BEAU QUARTIER',
        '36 min',
        'Mon Beau Quartier, la nouvelle émission de Benjamin Lecousin, son but, donner la parole à l\'association \"L\'École et Nous" ainsi qu\'aux habitants du quartier de Bellefontaine.',
        '',
        'http://www.esprit-occitanie.fr/emissions/monbeauquartier/2019-10-29monbeauquartier.mp3',
        '2019-10-30 00:00:00',
          2,
        4
    ),
    (
        'PATCHWORK',
        '42 min',
        'Émission du 17 Mars 2020',
        '',
        'http://www.esprit-occitanie.fr/emissions/patchwork/2020-03-17patchwork.mp3',
        '2020-03-17 00:00:00',
          2,
        4
    ),
    (
        'PATCHWORK',
        '47 min',
        'Retrouvez vos rubriques habituelles :

- Maître Marie consacre sa rubrique à la polémique du prix décerné à Roman POLANSKI lors de la Cérémonie des Césars.

- Maître Marie consacre sa rubrique à la polémique du prix décerné à Roman POLANSKI lors de la Cérémonie des Césars.

- La lectrice d\'Esprit Occitanie vous ouvre l\'appétit avec les crêpes aux Champignons de Consuelo dans un nouveau chapitre du roman "Superman ne volera plus" de Gilbert NOGUEZ aux éditions CAIRN.

- Dans sa chronique HAPPY WORK, Claire BREEDS veut savoir si l\'argent est le seul signe de reconnaissance au travail.',
        '',
        'http://esprit-occitanie.fr/emissions/patchwork/2020-03-10patchwork.mp3',
        '2020-03-10 00:00:00',
          2,
        4
    ),
    (
        'ECONOMICA',
        '60 min',
        'Maxime MAURY et Jacques LAVERGNE recoivent Georges DHERS',
        '',
        'http://esprit-occitanie.fr/emissions/economica/2020-06-12economica(georgesdhers).mp3',
        '2020-06-12 00:00:00',
          2,
        4
    ),
    (
        'ECONOMICA',
        '60 min',
        'Émission du 13 Mars 2020',
        '',
        'http://www.esprit-occitanie.fr/emissions/economica/2020-03-13economica.mp3',
        '2020-03-13 00:00:00',
          2,
        4
    ),
    (
        'ÇA VA MIEUX / ETIENNE GARCIA',
        '66 min',
        'Émission du 4 Février 2020',
        '',
        'http://www.esprit-occitanie.fr/emissions/cavamieux/2020-03-04cavamieux.mp3',
        '2020-02-04 00:00:00',
          2,
        4
    ),
    (
        'AINSI VA LA VIE / THIERRY FOURCASSIER',
        '66 min',
        'Aujourd\'hui dans Ainsi Va La Vie, Irène Finkel reçoit Thierry Fourcassier LR, maire sortant de Saint Jory, candidat à sa réélection pour la liste « avec vous pour Saint Jory',
        '',
        'http://www.esprit-occitanie.fr/emissions/ainsivalavie/2020-03-12avlv.mp3',
        '2020-03-12 00:00:00',
          2,
        4
    );



INSERT INTO
    `ro_podcast_has_ro_animator`(
        `ro_podcast_podcast_id`,
        `ro_animator_animator_id`
    )
VALUES
    (1, 7),
    (2, 7),
    (3, 6),
    (4, 9),
    (5, 9),
    (6, 2),
    (6, 6),
    (6, 8),
    (6, 10),
    (7, 2),
    (7, 6),
    (7, 8),
    (7, 10),
    (8, 7),
    (8, 11),
    (9, 7),
    (9, 11),
    (10, 7),
    (11, 5);
 
SET FOREIGN_KEY_CHECKS = 1; 
