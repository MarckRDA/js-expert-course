import ViewFactory from "../../shared/base/viewComponent.mjs";
import TableConsoleComponent from "./table.mjs";

export default class ConsoleFactory extends ViewFactory {
    createTable() {
        return new TableConsoleComponent()
    }
}