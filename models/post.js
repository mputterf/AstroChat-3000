module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

        body: {
            type: DataTypes.TEXT,

        }
    });

    Post.associate = function (models) {
        // Post should belong to an User
        // A Post can't be created without an User due to the foreign key constraint
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};
