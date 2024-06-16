module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'rooms',
      timestamps: false
    });
  
    Room.associate = function(models) {
      Room.hasMany(models.Booking, { foreignKey: 'room_id' });
    };
  
    return Room;
  };
  