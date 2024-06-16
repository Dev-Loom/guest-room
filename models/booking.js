module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      guest_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      room_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'rooms',
          key: 'id'
        }
      }
    }, {
      tableName: 'bookings',
      timestamps: false
    });
  
    Booking.associate = function(models) {
      Booking.belongsTo(models.Room, { foreignKey: 'room_id' });
    };
  
    return Booking;
  };
  