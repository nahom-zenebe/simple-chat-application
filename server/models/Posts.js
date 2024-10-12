// models/Posts.js
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type:  DataTypes.STRING,
            allowNull: false,
        },
        username: { // Corrected from 'uername' to 'username'
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Posts.associate = (models) => {
        Posts.hasMany(models.Comment, {
          onDelete: "cascade",
        });
    
        Posts.hasMany(models.Likes, {
          onDelete: "cascade",
        
        });
      };
      return Posts;
}