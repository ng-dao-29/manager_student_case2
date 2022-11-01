import {Group} from "./Group";
import {managerStudent} from "../../main";

export class ManagerGroup {
    list: Group [] = [];
    numberGroup: number
    constructor() {
        this.numberGroup = 0;
    }

    // kiểm tra group có tồn tại ko(đã xong)
    checkName(nameGroup): boolean {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].nameGroup == nameGroup) {
                return false;
            }
        }
        return true;
    }

    //thêm group (đã xong)
    addGroup(nameGroup: string): void {
        if (this.checkName(nameGroup)) {
            this.list.push(new Group(nameGroup));
            console.log(`Đã tạo thành công Group có tên: ${nameGroup}`)
            this.numberGroup++
        } else {
            console.log(`Tên Group ${nameGroup} đã tồn tại hãy lấy tên khác!`);
        }
    }
    // hiển thị group (đã xong)
    showGroup() {
        console.table(this.list, ["nameGroup", "numberMembers"])
    }
    // tìm vị trí group trong mảng (đã xong)
    checkIndex(group: string): number {
        let index = 0;
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].nameGroup == group) {
                index = i;
                return index;
            }
        }
        return -1
    }

    // sửa tên group (đã xong)
    editGroup(nameGroup, newName): void {
        let index = this.checkIndex(nameGroup);
        if (index == -1) {
            console.log(`không tồn tại Group ${nameGroup}`)
        } else {
            this.list[index].editName(newName);
            for (let i = 0; i < managerStudent.size; i++) {
                if (managerStudent.list[i].group == nameGroup) {
                    managerStudent.list[i].editGroup(newName);
                }
            }
            console.log(`Đã đổi tên Group thành công! tên cũ là ${nameGroup} tên mới sẽ là: ${newName}`)
        }
    }

    // tìm kiếm group (đã xong)
    searchGroup(nameGroup): Group {
        let index = this.checkIndex(nameGroup);
        if (index == -1) {
            console.log(`không tồn tại Group có tên ${nameGroup}`)
        } else {
            console.log("thông tin Group mà bạn đăng muốn tìm: ")
            console.table(this.list[index]);
            return this.list[index];
        }
    }

    // xóa group (đã xong)
    deleterGroup(group: string): void {
        let index = this.checkIndex(group);
        if (index == -1) {
            console.log(`không tồn tại Group có tên là: ${group}`)
        } else {
            if (this.list[index].numberMembers < 1) {
                this.list.splice(index, 1);
                this.numberGroup--;
                console.log(`Đã thông bao giải tán Group ${group}`)
            } else {
                console.log(`Group ${group} vẫn đăng hoạt động với số thành viên là 
                ${this.list[index].numberMembers} không thể xóa!`)
            }
        }
    }

    //hiển thị top group nhiều sinh viên tham gia nhất (đã xong)
    rankGroup(): Group [] {
        let back = true;
        for (let i = 1; i < this.list.length && false; i++) {
            back = false;
            for (let j = 0; j < this.list.length - i; j++) {
                if (this.list[j].numberMembers < this.list[j + 1].numberMembers) {
                    let temp: Group = this.list[j];
                    this.list[j] = this.list[j + 1];
                    this.list[j + 1] = temp;
                    back = true;
                }
            }
        }
        return this.list;
    }
    //updata danh sách Group(đã xong)
    updateListGroup(): void {
        for (let i=0; i<this.list.length; i++) {
            this.list[i].setlist();
        }
    }

}