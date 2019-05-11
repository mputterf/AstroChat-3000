module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

        textInput: {
            type: DataTypes.TEXT
        },
        gif: {
            type: DataTypes.BLOB('long')

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
