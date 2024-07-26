import { DataTypes, Model } from "sequelize";
import DatabaseConfig from "../../config/database";
import { AppRole } from "../../model/enums/app.role";
const sequelize = new DatabaseConfig().initDb();

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: AppRole;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Admin', 'User'),
        allowNull: false
    },
}, {
    tableName: 'users',
    sequelize: sequelize,
    modelName: 'User',
});