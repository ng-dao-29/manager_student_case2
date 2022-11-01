import * as readlineSync from "readline-sync"
import {ControlStudent} from "./student/ControlStudent";
import {ControlGroup} from "./group/ControlGroup";
import {ControlAdminGroup} from "./group/ControlAdminGroup";

export class ControlMain {
    controlStudent: ControlStudent;
    controlGroup: ControlGroup;
    controlAdminGroup: ControlAdminGroup;

    constructor(student: ControlStudent,
                group: ControlGroup,
                adminGroup: ControlAdminGroup) {
        this.controlStudent = student;
        this.controlGroup = group;
        this.controlAdminGroup = adminGroup;
    }
    //hiển thị menu(đã xong)
    showMenu(): void {
        console.log("")
        console.log("|===============================|");
        console.log("|   Chọn đối tượng quản lý      |");
        console.log("|===============================|")
        console.log("|  1 - Quản lý sinh Viên.       |");
        console.log("|  2 - Quản lý Group.           |");
        console.log("|  3 - Quản lý một Group cụ thể.|");
        console.log("|  0 - Thoát.                   |");
        console.log("|===============================|");
        console.log("")
    }
    // sử lý lựa chọn (đã xong)
    mainMenu(): void {
        let back = true;
        while (back) {
            this.showMenu();
            let action = +readlineSync.question("Doi tuong ban muon quan ly la: ");
            switch (action) {
                case 1:
                    this.controlStudent.studentManagement();
                    break;
                case 2:
                    this.controlGroup.groupManagement();
                    break;
                case 3:
                    this.controlAdminGroup.controlAdmin();
                    break
                case 0:
                    back = false;
                    break;
            }
        }
    }
}