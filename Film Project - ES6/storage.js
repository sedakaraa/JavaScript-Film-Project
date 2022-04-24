class Storage {

    static addFilmToStorage (newFilm){

        let films = this.getFilmsFromStorage(); 
        
        films.push(newFilm);  // push array in sonuna eleman ekle demek.
        /*
        
         [
             {title:"sdfghsdfg", director:"sdfghj", url:"5665232"},
             {title:"sdfghsdfg", director:"sdfghj", url:"5665232"},
        
         ]
        
        */
         localStorage.setItem("films", JSON.stringify(films)); // set, atamak
        
        }
        
        static getFilmsFromStorage (){
        
            let films;
        
            if (localStorage.getItem("films") === null){  // get, getirmek
                films = [];
         
            }
            else {
                films = JSON.parse(localStorage.getItem("films"));
        
            }
            return films;
        
        }
        static deleteFilmFromStorage (filmTitle){
          let films = this.getFilmsFromStorage();
        
          films.forEach(function(film,index){
              if(film.title === filmTitle) {
                  films.splice(index,1);
              }
          });
        
          localStorage.setItem("films", JSON.stringify(films));
        
        
        
        }
      static clearAllFilmsFromStorage () {
        
            localStorage.removeItem("films");
        }
        
}
