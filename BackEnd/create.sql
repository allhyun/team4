-- 데이터 베이스 이름 생성
-- CREATE DATABASE (DB이름)
-- DEFAULT CHARACTER SET UTF8MB4 DEFAULT COLLATE UTF8MB4_UNICODE_CI;

-- table 생성
CREATE TABLE user (
	u_idx	int	NOT NULL auto_increment PRIMARY KEY ,
	userid	varchar(20)	NOT NULL,
	email	varchar(30)	NOT NULL,
	password	varchar(500)	NOT NULL,
	salt	varchar(500)	NOT NULL,
	nickname	varchar(20)	NOT NULL,
	image	varchar(500)
);


CREATE TABLE board (
	b_idx	int	NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	u_idx	int	NOT NULL,
	title	varchar(20)	NOT NULL,
	category	varchar(20)	NOT NULL,
	content	text	NOT NULL,
	viewcount	int	NOT NULL,
	bregdate	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (u_idx) REFERENCES user(u_idx) on DELETE cascade
);


CREATE TABLE study (
	st_idx	int	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	u_idx	int	NOT NULL,
	st_title	varchar(20)	,
	st_intro	varchar(100) ,
	st_now_mem	int	,
	st_limit	int	,
	st_date	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	st_fe	INT	,
	st_be	INT,
	st_pub	INT,
	st_full	INT,
    FOREIGN KEY(u_idx) REFERENCES user(u_idx) on DELETE cascade
);



CREATE TABLE  usedgoods  (
	ud_idx	int	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	u_idx	int	NOT NULL,
	ud_price	int NOT NULL,
	ud_title	varchar(20) NOT NULL,
	ud_content	text NOT NULL,
	viewcount int NOT NULL,
	ud_date	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(u_idx) REFERENCES user(u_idx) ON DELETE CASCADE
);


CREATE TABLE chattingroom (
	r_idx	int	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	r_name	varchar(20)	NOT NULL,
	r_create	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	u_idx int NOT NULL,
	FOREIGN KEY (u_idx) REFERENCES user(u_idx) on DELETE cascade
);

CREATE TABLE chatmessage (
	ms_idx	int	NOT NULL PRIMARY KEY auto_increment,
	u_idx	int,
	r_idx	int	NOT NULL,
	c_content	text NOT NULL,
	c_date	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(u_idx) REFERENCES user(u_idx),
    FOREIGN KEY(r_idx) REFERENCES chattingroom(r_idx) on DELETE cascade
);
CREATE TABLE chatuser(
	cu_idx int not null primary key auto_increment,
	u_idx int not null,
    r_idx int not null,
    foreign key(u_idx) references user(u_idx) on delete cascade,
    foreign key(r_idx) references chattingroom(r_idx) on delete cascade
);


CREATE TABLE volunteer (
	v_idx int NOT NULL PRIMARY KEY auto_increment,
	u_idx int NOT NULL,
	st_idx int NOT NULL,
	v_role VARCHAR(20),
	FOREIGN KEY(u_idx) REFERENCES user(u_idx) on DELETE cascade,
	FOREIGN KEY(st_idx) REFERENCES study(st_idx) on DELETE cascade
);




CREATE TABLE heart (
	h_idx INT NOT NULL PRIMARY KEY,
	u_idx INT NOT NULL,
	ud_idx INT NOT NULL,
	FOREIGN KEY(u_idx) REFERENCES user(u_idx) ON DELETE CASCADE,
	FOREIGN KEY(ud_idx) REFERENCES usedgoods(ud_idx) ON DELETE CASCADE
);