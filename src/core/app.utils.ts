import bcrypt from "bcryptjs";

export class AppUtils {
    public static async generateHashPassword(pass: string): Promise<string> {
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(pass, 10);
            console.log("Hashed Password:", hashedPassword);
            return hashedPassword;
        } catch (error) {
            console.error("Error:", error);
            Promise.reject("Error hashing password");
        }
        return Promise.resolve("");
    }

    public async compareHashPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            // Compare the hashed password with the plain text password
            const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
            console.log("Password Match:", isMatch);
            return isMatch;
        } catch (error) {
            console.error("Error:", error);
        }
        return false;
    }
    
}