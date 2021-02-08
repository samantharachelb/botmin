import { execSync } from "child_process";

export default abstract class Constants {
    static version: string;
    static getVersion(): void {
        try {
            this.version = execSync("git describe --tags --abbrev=0 --always").toString('ascii')
        } catch (e) {
            if (process.env.npm_package_version !== undefined) {
                this.version = process.env.npm_package_version;
            } else {
                this.version = "unknown version";
            }
        }
    }
}
