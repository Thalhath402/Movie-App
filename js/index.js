//    search movies

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
        
    const searchTerm = document.getElementById("search").value;
    if(searchTerm) {
        var url= "https://api.themoviedb.org/3/search/movie?api_key=8c5973b82ab5c5467599f6f0c8a160eb&query="+searchTerm
        document.getElementById("cat").innerHTML="Based on the search "+searchTerm
        movie(url)   
    }

})
const url2="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8c5973b82ab5c5467599f6f0c8a160eb"
movie(url2)
 
    //   fetching movie

function movie(url){
    fetch(url)
        .then((Response)=>{
            if (!Response.ok) {
                throw new Error("No Data found");               
            }
            return Response.json();           
        })   
        .then((data)=>{
            console.log(data)
            let movieCard=[];
            data.results.map((results)=>{
                const imgPath=results.poster_path
                const title=results.title
                const votAvg=results.vote_average
                const rDate=results.release_date
                const overView=results.overview
                
                movieCard+= `<div class="card mx-auto my-3">
                            <img src="https://image.tmdb.org/t/p/w500/${imgPath}" class="card-img-top" alt="...">                           
                            <div class="card-body">                            
                                <h5 class="card-title">${title}</h5>
                                <h6 class="card-text rating ${getColor(votAvg)}"> ${votAvg}</h6>
                                <p class="card-text">Release Date   ${rDate}</p>
                                <a href="#" class="btn btn-outline-light">Watch Now</a>
                                    <div class="overview py-auto">
                                    <p class="card-text text-center">${overView}</p>
                                    </div>
                            </div>
                        </div>`
            })            
        document.getElementById("canvas").innerHTML=movieCard
            if(data.results.length==0){
                
                document.getElementById("cat").innerHTML="Their Is No Such A Film";
            }
        })
}
//   movie rating

    function getColor(votAvg){
        if (votAvg>=8){
            return "green"
        }
        else if(votAvg>=5 && votAvg<8){
            return "orange"
        }
        else {
            return "red"
        }
    }

