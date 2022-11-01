"use strict";
exports.__esModule = true;
exports.ManagerGroup = void 0;
var Group_1 = require("./Group");
var main_1 = require("../../main");
var ManagerGroup = /** @class */ (function () {
    function ManagerGroup() {
        this.list = [];
        this.numberGroup = 0;
    }
    // kiểm tra group có tồn tại ko(đã xong)
    ManagerGroup.prototype.checkName = function (nameGroup) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].nameGroup == nameGroup) {
                return false;
            }
        }
        return true;
    };
    //thêm group (đã xong)
    ManagerGroup.prototype.addGroup = function (nameGroup) {
        if (this.checkName(nameGroup)) {
            this.list.push(new Group_1.Group(nameGroup));
            console.log("\u0110\u00E3 t\u1EA1o th\u00E0nh c\u00F4ng Group c\u00F3 t\u00EAn: ".concat(nameGroup));
            this.numberGroup++;
        }
        else {
            console.log("T\u00EAn Group ".concat(nameGroup, " \u0111\u00E3 t\u1ED3n t\u1EA1i h\u00E3y l\u1EA5y t\u00EAn kh\u00E1c!"));
        }
    };
    // hiển thị group (đã xong)
    ManagerGroup.prototype.showGroup = function () {
        console.table(this.list, ["nameGroup", "numberMembers"]);
    };
    // tìm vị trí group trong mảng (đã xong)
    ManagerGroup.prototype.checkIndex = function (group) {
        var index = 0;
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].nameGroup == group) {
                index = i;
                return index;
            }
        }
        return -1;
    };
    // sửa tên group (đã xong)
    ManagerGroup.prototype.editGroup = function (nameGroup, newName) {
        var index = this.checkIndex(nameGroup);
        if (index == -1) {
            console.log("kh\u00F4ng t\u1ED3n t\u1EA1i Group ".concat(nameGroup));
        }
        else {
            this.list[index].editName(newName);
            for (var i = 0; i < main_1.managerStudent.size; i++) {
                if (main_1.managerStudent.list[i].group == nameGroup) {
                    main_1.managerStudent.list[i].editGroup(newName);
                }
            }
            console.log("\u0110\u00E3 \u0111\u1ED5i t\u00EAn Group th\u00E0nh c\u00F4ng! t\u00EAn c\u0169 l\u00E0 ".concat(nameGroup, " t\u00EAn m\u1EDBi s\u1EBD l\u00E0: ").concat(newName));
        }
    };
    // tìm kiếm group (đã xong)
    ManagerGroup.prototype.searchGroup = function (nameGroup) {
        var index = this.checkIndex(nameGroup);
        if (index == -1) {
            console.log("kh\u00F4ng t\u1ED3n t\u1EA1i Group c\u00F3 t\u00EAn ".concat(nameGroup));
        }
        else {
            console.log("thông tin Group mà bạn đăng muốn tìm: ");
            console.table(this.list[index]);
            return this.list[index];
        }
    };
    // xóa group (đã xong)
    ManagerGroup.prototype.deleterGroup = function (group) {
        var index = this.checkIndex(group);
        if (index == -1) {
            console.log("kh\u00F4ng t\u1ED3n t\u1EA1i Group c\u00F3 t\u00EAn l\u00E0: ".concat(group));
        }
        else {
            if (this.list[index].numberMembers < 1) {
                this.list.splice(index, 1);
                this.numberGroup--;
                console.log("\u0110\u00E3 th\u00F4ng bao gi\u1EA3i t\u00E1n Group ".concat(group));
            }
            else {
                console.log("Group ".concat(group, " v\u1EABn \u0111\u0103ng ho\u1EA1t \u0111\u1ED9ng v\u1EDBi s\u1ED1 th\u00E0nh vi\u00EAn l\u00E0 \n                ").concat(this.list[index].numberMembers, " kh\u00F4ng th\u1EC3 x\u00F3a!"));
            }
        }
    };
    //hiển thị top group nhiều sinh viên tham gia nhất (đã xong)
    ManagerGroup.prototype.rankGroup = function () {
        var back = true;
        for (var i = 1; i < this.list.length && false; i++) {
            back = false;
            for (var j = 0; j < this.list.length - i; j++) {
                if (this.list[j].numberMembers < this.list[j + 1].numberMembers) {
                    var temp = this.list[j];
                    this.list[j] = this.list[j + 1];
                    this.list[j + 1] = temp;
                    back = true;
                }
            }
        }
        return this.list;
    };
    //updata danh sách Group(đã xong)
    ManagerGroup.prototype.updateListGroup = function () {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].setlist();
        }
    };
    return ManagerGroup;
}());
exports.ManagerGroup = ManagerGroup;
