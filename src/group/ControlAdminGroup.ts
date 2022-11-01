import * as readlineSync from "readline-sync"
import {Group} from "./Group";
import {managerStudent} from "../../main";
import {managerGroup} from "../../main";

export class ControlAdminGroup {
    nameGroup: Group;
    regexpID: RegExp = /^[+0-9]{1,5}$/;
    constructor() {
    }
    //hiển thị menu(đã xong)
    menuAdmin(): void {
        console.log("");
        console.log("|====================================|");
        console.log("|          Danh mục quản lý          |");
        console.log("|====================================|")
        console.log("|  1 - Đổi tên group.                |");
        console.log("|  2 - Thêm sinh viên vào group.     |");
        console.log("|  3 - xóa Sinh viên khỏi Group.     |");
        console.log("|  4 - Hiên thị danh sách thành viên.|");
        console.log("|  0 - Để chở về Menu chính          |");
        console.log("|====================================|");
        console.log("")
    }
    //Sử lý lựa chọn(đã xong)
    controlAdminGroup(): void {
        let run = true;
        while (run) {
            this.menuAdmin();
            let action = +readlineSync.question("Chon chuc nang: ");
            switch (action) {
                case 1:
                    this.editName()
                    break;
                case 2:
                    this.addStudent();
                    break;
                case 3:
                   this.deleterStudent();
                   break;
                case 4:
                    this.showlist();
                    break;
                case 0:
                    run = false;
                    break;
                }
            readlineSync.question("enter de tiep tuc.");
            }
    }
    //show hanh sách thành viên Group(đã xong)
    showlist(): void {
        console.table(this.nameGroup.listStudent);
    }
    //xóa thành viên khỏi group(đã xong)
    //đăng bị chùng lặp code với Group.deleterStudent.
    deleterStudent() {
        let idDeleter = +readlineSync.question("Nhap vao ID cua sinh vien muon xoa khoi Group: ");
        while (!(this.regexpID.test(`${idDeleter}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            idDeleter = +readlineSync.question("ID sinh vien: ");
        }
        let index = managerStudent.searchById(idDeleter);
        if (index == -1) {
            console.log(`Không tìm thấy sinh viên nào có ID tương ứng là: ${idDeleter}`);
        }
        else {
            let deleter = true;
            for (let i = 0; i < this.nameGroup.numberMembers; i++) {
                if (this.nameGroup.listStudent[i].id == idDeleter) {
                    this.nameGroup.deleteStudent(idDeleter);
                    managerGroup.updateListGroup();
                    deleter = false;
                }
            }
            if (deleter) {
                console.log(`sinh viên có ID ${idDeleter} không ở trong Group`);
            }
        }
    }
    //thêm thành viên(đã xong)
    addStudent(): void {
        let idAdd = +readlineSync.question("Nhap vao ID cua sinh vien muon them vao Group: ");
        while (!(this.regexpID.test(`${idAdd}`))) {
            console.log(`ID phải là số. Có ít nhất 1 số và tối đa là 5 số.`);
            idAdd = +readlineSync.question("ID sinh vien: ");
        }
        this.nameGroup.addStudent(idAdd);
        managerGroup.updateListGroup();
    }
    //thiết lập dữ liệu nameGroup(đã xong)
    setNameControlGroup(group) {
        this.nameGroup = managerGroup.searchGroup(group);
    }
    //run
    controlAdmin(): void {
        let group = readlineSync.question("Ban la ADMIN cua Group: ");
        if (managerGroup.checkName(group)) {
            console.log(`Hiện tại Group "${group}" chưa được thành lập.`);
            readlineSync.question("Ban se duoc dua ve menu chinh.");
        }
        else {
            this.setNameControlGroup(group);
            this.controlAdminGroup();
        }
    }
    //sửa tên group(đã xong)
    editName() {
    let newName = readlineSync.question("Ten Group se dc thay doi thanh: ");
        if (managerGroup.checkName(newName)) {
        managerGroup.editGroup(this.nameGroup.nameGroup,newName);
        }
        else {
        console.log("Đã có Group có tên tương tự hãy lấy tên khác");
        }
    }
}