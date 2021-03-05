* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto Slab', 'Arial';
}

body {
    background-color: #1f1d22;
    padding:5%;
}
.wrapper2{
  max-width:1400px;
  margin: 0 auto;
}
.wrapper {
    
    display: flex;
    justify-content:left;
    flex-wrap: wrap;

}

h1 {
    color: #cdff50;
    font-size: 6em;
    border-bottom: 1px solid #cdff50;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 4%;
    
}

.user-note-pad {
    border: 1px solid #4a4a4a;
    border-radius: 7px;
    width: 31.4%;
    background-color: #1f1d22;
    margin: 0.8%;
    box-shadow: 0px 0px 20px black;

}

form {
    margin: 10px;
    margin-bottom: 42px;
}

textarea {
    max-width: 95%;
}



@media only screen and (max-width: 1100px) {
    .wrapper {
    
        justify-content: space-between;
        flex-wrap:wrap;

    }
    .user-note-pad {
        width: 48.2%;
       
    }
}


@media only screen and (max-width: 700px) {
    .user-note-pad {
        width: 100%;
    }
}

.noteH2 {
    color: #cdff50;
    font-weight: 400;
    font-size: 1.35em;
    padding: 10px 20px 10px 20px;
    background-color:transparent;
    border: none;
    border-radius: 10px;
    width:100%;
    /* border-bottom: 1px solid #cdff50; */
   
}


i {
    font-size: 3em;
}

.noteP {
    font-size: 1em;
    color: #cdff50;
    font-weight: 200;
    padding: 20px;
    background-color:transparent;
    border: none;
    width: 100%;
    min-height: 10em;
    position:relative;
    z-index: 0;
}

input,
textarea {
    caret-color: #cdff50;

}

.btn {
    transition:.2s;
 
    background-color: #cdff50;
    color: #1e1f23;
    border: none;
    padding: 0px 15px 0px 15px;
    border-radius: 5px;
    font-size: 2em;
    font-weight: 800;
    padding-bottom: .1em;
}

.btn:hover {
    transition:.2s;
    background-color: #cdff50;
    transform:scale(1.1);
}

.title {
    background-color: transparent;
    border: none;
    font-size: 2.25em;
    color: gray;
}

.body-copy {
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    color: gray;
    font-weight: 200;
}

textarea:focus {
    outline: 0;
}

input:focus {
    outline: 0;
}

i { 
    transition: .3s;
    color: #cdff50aa;
    font-size: 2em;
    float: right;
    margin: 10px;
}

i:hover, i:focus {
    transition: .3s;
    color: #cdff50;
}


.underline {

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.242);   
    position:relative;
    z-index: 1;
}

.add {
    cursor: pointer;
}

textarea {
    resize: none;
}

.close-this {
    cursor: pointer;
}