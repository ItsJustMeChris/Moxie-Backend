# Moxie

Moxie is a goal oriented network for setting and achieving whatever you want in life.

## Installation

Clone or download this repo.

```bash
git clone https://github.com/ItsJustMeChris/Moxie-Backend.git
```
Install Postgres

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```
Create Postgres database and user

```bash
sudo -u postgres psql
create database moxie;
create user moxie with encrypted password 'moxiep4ssword';
grant all privileges on database moxie to moxie;
```

Install the dependancies

```bash
npm i
```
Setup the systemd service (moxie.service) or follow manual/alternative setups down yonder.

```bash
nano moxie.service # Replace placeholders with your data, see example.
mv moxie.service /lib/systemd/system/
systemctl start moxie
systemctl status moxie # Should show "active (running)" with a green dot
```
Example service file
```
[Unit]
Description=Moxie - Mindful Goals
Documentation=https://github.com/ItsJustMeChris/Moxie-Backend
After=network.target

[Service]
Environment=DBHOST=localhost
Environment=DBPORT=5432
Environment=DBNAME=moxie
Environment=DBUSER=moxie
Environment=DBPASS=moxiep4ssword

Environment=SERVERPORT=4003

Environment=SSLCERT=/etc/letsencrypt/live/myweb.site/privkey.pem
Environment=SSLKEY=/etc/letsencrypt/live/myweb.site/fullchain.pem
Environment=SSLCHAIN=/etc/letsencrypt/live/myweb.site/chain.pem

Environment=NODE_ENV=production

Type=simple
User=root
ExecStart=/usr/local/bin/node /home/node/Moxie/app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
