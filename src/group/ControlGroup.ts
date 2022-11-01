import * as readlineSync from "readline-sync"
import {managerGroup, managerStudent} from '../../main'
export class ControlGroup {
    constructor() {
    }
    // hiển thị menu(đã xong)
    showGroupMenagement(): void {
        console.log("")
        console.log("|==========================================================|");
        console.log("|                         Quản lý Group                    |");
        console.log("===========================================================|")
        console.log("|  1 - Thêm Group.                                         |");
        console.log("|  2 - Xóa Group.                                          |");
        console.log("|  3 - Sửa tên Group.                                      |");
        console.log("|  4 - Hiển thị danh sách Group.                           |");
        console.log("|  5 - Sếp hạng Group sôi nổi nhất (nhiều thành viên nhất).|");
        console.log("|  6 - Tìm kiếm group.                                     |");
        console.log("|  0 - Chở về menu chính.                                  |");
        console.log("|==========================================================|");
        console.log("")
    }
    //sử lý hành động(đã xong)
    groupManagement(): void {
        let run = true;
        while (run) {
            this.showGroupMenagement();
            let action = +readlineSync.question("chon chuc nang: ");
            switch (action) {
                case 1:
                    this.addGroup();
                    break;
                case 2:
                    this.deleterGroup();
                    break;
                case 3:
                    this.groupEdit();
                    break;
                case 4:
                    managerGroup.showGroup();
                    break;
                case 5:
                    console.table(managerGroup.rankGroup(),["nameGroup", "numberMembers"]);
                    break;
                case 6:
                    this.searchGroup();
                    break;
                case 0:
                    run = false;
                    break;
            }
           readlineSync.question("enter de tiep tuc");
        }
    }
    //thêm group(đã xong)
    addGroup(): void {
        let groupName = readlineSync.question("Nhap vao ten Group: ");
        managerGroup.addGroup(groupName)
    }
    //xóa group(đã xong)
    deleterGroup(): void {
        let group = readlineSync.question("Nhap vao ten Group muon xoa: ");
        managerGroup.deleterGroup(group);
    }
    //sửa tên geoup(đã xong)
    groupEdit(): void {
        let group = readlineSync.question("Nhap vao Group muon doi ten: ");
        if (managerGroup.checkName(group)) {
            console.log(`không tồn tại Group có tên ${group}`);
        } else {
            let back = true;
            while (back) {
                let newNameGroup = readlineSync.question("Group se duoc doi ten thanh: ");
                if (managerGroup.checkName(newNameGroup)) {
                    managerGroup.editGroup(group, newNameGroup)
                    back = false;
                } else {
                    console.log("Đã có Group có tên tương tự hãy lấy tên khác");
                }
            }
        }
    }
    //tìm group(đã xong)
    searchGroup(): void {
        let group = readlineSync.question("Ban dang muon tim Group: ");
        // managerGroup.searchGroup(group);
        console.table(managerStudent.searchGroup(group));
    }
}

