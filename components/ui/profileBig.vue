<template>
    <div class="profile-container">
        <div class="container">
            <div class="profile-big">
                <div class="header"
                    style="background:url(https://31.media.tumblr.com/d83b99e22981d5e58e2bd74ed2494087/tumblr_n4ef3ynCZP1st5lhmo1_1280.jpg) no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;">
                </div>
                <div class="profile-image">
                    <img src="https://assets.tumblr.com/images/default_avatar/sphere_open_128.png" />
                </div>
                <div class="post-content">
                    <h3>robby</h3>
                    <p>UI/UX Designers</p>
                    <p>A designer, developer, and
                        photographer.</p>
                </div>
                <div class="table">
                    <div class="row">
                        <div class="item">
                            <a href="https://dribbble.com/mkchin">
                                <font-awesome-icon icon="fa-solid fa-d" />
                            </a>
                            <div class="comment bottom">Dribbble</div>
                        </div>
                        <div class="item">
                            <a href="https://www.instagram.com/masrbb">
                                <font-awesome-icon icon="fa-solid fa-hashtag" />
                            </a>
                            <div class="comment bottom">
                                Instagram
                            </div>
                        </div>
                        <div class="item">
                            <a href="https://www.linkedin.com/in/albani-robbyan-s-y-6367a5147">
                                <font-awesome-icon icon="fa-brands fa-linkedin-in" />
                            </a>
                            <div class="comment bottom">Linkedin</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.post-content {
    padding: 50px 100px;
}

/* end of global */

/* profile start */
.profile-container {
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
}

.container {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    position: relative;
}

.profile-big {
    width: 300px;
    position: absolute;
    left: -320px;
    background-color: var(--white);
    border: 1px solid var(--chinese-white);
    margin-top: 20px;
    border-radius: 5px;
}

.profile-big .post-content {
    padding: 20px;
    padding-top: 50px;
}

.profile-big .post-content h3 {
    text-align: center;
    color: var(--dark-charcoal);
    font-weight: var(--fwReguler);
}


.header {
    width: 100%;
    height: 200px;
}

.profile-image {
    position: absolute;
    top: 150px;
    left: 100px;
}

.profile-image img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 5px solid var(--white);
    display: block;
}


.table {
    display: table;
    width: 100%;
    text-align: center;
}

.row {
    display: table-row;
}

.item {
    display: table-cell;
    padding: 10px;
    width: 33%;
    border-bottom: 5px solid var(--white);
    cursor: pointer;
    position: relative;
}

.item:hover {
    border-bottom: 5px solid var(--dark-charcoal);
}

.item:hover .comment {
    display: block;
}


.comment {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    background-color: var(--white);
    padding: 10px;
    text-align: center;
    color: var(--grey);
    font-size: var(--forParagraph);
    position: absolute;
    bottom: -45px;
    left: 50%;
    margin-left: -50px;
    border: 1px solid var(--chinese-white);
    display: none;
    z-index: 10;
}

.comment:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid var(--chinese-white);
}

/* profile end */

@media screen and (max-width:990px) {
    .profile-big {
        display: none;
    }

    .container {
        padding: 20px;
        padding-top: 0px;
    }
}

@media screen and (max-width:700px) {
    .post-content {
        padding: 50px;
    }

}

@media screen and (max-width:500px) {
    .post-content {
        padding: 20px;
        padding-top: 50px;
    }

    .container {
        padding: 10px;
    }
}
</style>