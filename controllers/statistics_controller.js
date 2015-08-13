var models = require('../models/models.js');

exports.show = function(req, res) {

    var statistics = {nQueries: {name: "Numero de preguntas", value: 0 }, 
                      nComments: {name: "Numero de comentarios", value: 0},
                      avgCommentsPerQuestion: {name: "Media de comentarios por pregunta", value: 0},
		      nQueriesWithComments: {name: "Numero de preguntas con comentarios", value: 0},
		      nQueriesWithoutComments: {name: "Numero de preguntas sin comentarios", value: 0 }
                     };
    
    // Access database
    models.Quiz.count().then(function(nQueries){
				statistics.nQueries.value = nQueries;
				console.log("Number of queries:" + nQueries);
				return models.Comment.count();
			}).
			then(function(nComments){
				statistics.nComments.value = nComments;
				console.log("Number of comments:" + nComments);
				return models.Quiz.count({distinct:true, include: [{model: models.Comment, required: true}]});
			}).
			then(function (nQueriesWithComm){
				statistics.nQueriesWithComments.value = nQueriesWithComm;
				console.log("Number of queries with comments:" + nQueriesWithComm);
			}).
			catch(function(error){
				console.log(error);
			}).
			finally(function(){
				if( statistics.nQueries.value !== 0 ){
					statistics.avgCommentsPerQuestion.value = 
						statistics.nComments.value / statistics.nQueries.value;
				}
				statistics.nQueriesWithoutComments.value = statistics.nQueries.value -
					statistics.nQueriesWithComments.value;
				res.render('statistics/show', { statistics: statistics, errors: []});
			});
		
};
