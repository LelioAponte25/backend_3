const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");

Movies.belongsToMany(Genres, { through: "MovieGenre" });
Genres.belongsToMany(Movies, { through: "MovieGenre" });


Movies.belongsToMany(Actors, { through: "MovieActors" });
Actors.belongsToMany(Movies, { through: "MovieActors" });

Movies.belongsToMany(Directors, { through: "MovieDirectors" });
Directors.belongsToMany(Movies, { through: "MovieDirectors" });

