module.exports = function (sequelize, DataTypes) {
    var Password = sequelize.define("Password", {

        passwd: {
            type: DataTypes.TEXT
        }
    });

    Password.associate = function (models) {
        // Password should belong to an User
        // A password can't be created without an User due to the foreign key constraint
        Password.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Password;
};
