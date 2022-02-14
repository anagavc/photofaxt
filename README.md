
# Photofaxt

`This is a  fully dynamic NodeJS and Mongo DB based portfolio for a digital agency and it was my first attempt at building a fullstack application after I finished the web developer bootcamo course on udemy by Colt Steele.
You have the ability to fully customize every single item on the web app,which includes the hero image, the website title, the about and the name if each of the galleries etc.
The CSS framework used is  Bootstrap and the views are rendered with the aid of Embedded JavaScript (EJS).The images are uploaded to cloudinary and the file urls are saved to the database thereby allowing for a faster loading time. The user authentication is done with the aid of Passport JS.`


## Demo

`The link to the live website:`

https://tranquil-river-09003.herokuapp.com/
## Features

- Admin Panel
- Fully dynamic
- Easily customizable
- Image upload to cloudinary
- Accept bookings from prospective clients
- Abiliity to upload images to specific galleries/collections



## Installation

Make sure you have node installed and then procced to execute this command in the terminal

```bash
  npm i
```
    
## Environment Variables

Create an account on mongodb.com and create a new cluster, then set the env value of:

```javascript
DB_URL = to the name of yout atlas database

```
Create an account on cloudinary and set all the values with the name cloudinary to the respective cloudinary value:
```javascript
CLOUDINARY_CLOUD_NAME = name_of_cloudinary_cloud
CLOUDINARY_KEY = cloudinary_key
CLOUDINARY_SECRET = cloudinary_secret_phrase
```

For management of the sessions, set an env variable

```javascript
SECRET = any_secret_key_of_your_choice

```


## Usage/Examples

`Can be fully customized for businesses that have to do with presentation of select image galleries`


## Screenshots
`The Hero Section`

![Hero Section](https://i2.paste.pics/G11IH.png)

`The Gallery Section`
![Gallery Section](https://i2.paste.pics/G11M9.png)

`The Admin Panel`
![Admin Panel](https://i2.paste.pics/G11O5.png)

## Contributing

Contributions are highly appreciated!

`Kindly send a pull request and I will review them with immediate effect`

