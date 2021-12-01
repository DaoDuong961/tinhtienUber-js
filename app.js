// khai bao cac mang gia va gia cho cho cac loai xe 
const ARRAY_GIA_UBER_X = [8000, 12000, 10000];
const GIA_CHO_UBER_X = 2000;

const ARRAY_GIA_SUV = [9000, 14000, 12000];
const GIA_CHO_SUV = 3000;

const ARRAY_GIA_BLACK = [10000, 16000, 14000];
const GIA_CHO_BLACK = 4000;

function kiemtraLoaiXe() {
    var uberX = document.getElementById("uberX")
    var uberSuv = document.getElementById("uberSUV")
    var uberBlack = document.getElementById("uberBlack")

    if (uberX.checked) {
        return "uberX";
    } else if (uberSuv.checked) {
        return "uberSUV";
    } else if (uberBlack.checked) {
        return "uberBlack";
    }
}
// tren 3 phut moi tinh tien cho cu 3 phut tinh 1 lan 
function tinhTienCho(thoiGianCho, giaCho) {
    var tienCho = 0;
    if (thoiGianCho >= 3) {
        tienCho = Math.round(thoiGianCho / 3.0) * giaCho;
    }
    return tienCho;
}
function tinhTien(soKM, thoiGianCho, arrayPrice, giaCho){
    var tienCho = tinhTienCho(thoiGianCho, giaCho);
    if(soKM <=1 ){
        return arrayPrice[0] + tienCho;
    }else if(soKM > 1 && soKM <= 20){
        return arrayPrice[0] + (soKM - 1) * arrayPrice[1] + tienCho;
    }else if(soKM > 20){
        return arrayPrice[0] + 19*arrayPrice[1] + (soKM -20)*arrayPrice[2] + tienCho;
    }
}
function tinhTongTien() {
    var soKM = document.getElementById("soKM").value;
    var thoiGianCho = document.getElementById("thoiGianCho").value;

    soKM = parseFloat(soKM)
    thoiGianCho = parseFloat(thoiGianCho);

    var tongTien = 0;
    var loaiXe = kiemtraLoaiXe();
    switch (loaiXe) {
        case "uberX":
            tongTien = tinhTien(soKM, thoiGianCho, ARRAY_GIA_UBER_X, GIA_CHO_UBER_X);    
        break;
        case "uberSUV":
            tongTien = tinhTien(soKM, thoiGianCho, ARRAY_GIA_SUV, GIA_CHO_SUV);     
        break;
        case "uberBlack":
            tongTien = tinhTien(soKM, thoiGianCho, ARRAY_GIA_BLACK, GIA_CHO_BLACK);     
        break;
        default: {
            alert("Vui long chon loai xe");
        }
    }
    return tongTien;
}
document.getElementById("btnTinhTien").onclick = function(){
    var tongTien = tinhTongTien();
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById("xuatTien").innerHTML = tongTien.toLocaleString('vn');
}



function renderRowChiTietKm(loaiXe, arrayKm, arrayPrice, tblBody){
     for(var i=0; i<arrayKm.length; i++){
         var tr = document.createElement("tr"); 

         var tdLoaiXe = document.createElement("td");
         var tdSuDung = document.createElement("td");
         var tdDonGia = document.createElement("td");
         var tdThanhTien = document.createElement("td");

         tdLoaiXe.innerHTML = loaiXe;
         tdSuDung.innerHTML = arrayKm[i] + " km";
         tdDonGia.innerHTML = arrayPrice[i];
         tdThanhTien.innerHTML = arrayKm[i] * arrayPrice[i];

         tr.appendChild(tdLoaiXe);
         tr.appendChild(tdSuDung);
         tr.appendChild(tdDonGia);
         tr.appendChild(tdThanhTien);

         tblBody.appendChild(tr);
     }
}
function renderRowThoiGianCho(thoiGianCho, giaCho, tblBody){
    var tienCho = tinhTienCho(thoiGianCho, giaCho);
    var trthoiGianCho = document.createElement("tr");

    var tdPhutTittle = document.createElement("td");
    var tdPhut = document.createElement("td");
    var tdDonGia = document.createElement("td");
    var tdThanhTien= document.createElement("td");

    tdPhutTittle.innerHTML = "Thoi gian cho";
    tdPhut.innerHTML = thoiGianCho + "phut";
    tdDonGia.innerHTML = giaCho;
    tdThanhTien.innerHTML = tienCho;
    
    trthoiGianCho.appendChild(tdPhutTittle);
    trthoiGianCho.appendChild(tdPhut);
    trthoiGianCho.appendChild(tdDonGia);
    trthoiGianCho.appendChild(tdThanhTien);

    tblBody.appendChild(trthoiGianCho);
}

function renderRowTongCong(tongTien, tblBody){
    var trTotal = document.createElement("tr");
    trTotal.className = "alert alert-success";

    var tdTotalTittle = document.createElement("td");
    tdTotalTittle.setAttribute("colspan", 3);
    var tdTotal = document.createElement("td");

    tdTotalTittle.innerHTML = "Tong tien phai tra";
    tdTotal.innerHTML = tongTien;

    trTotal.appendChild(tdTotalTittle);
    trTotal.appendChild(tdTotal)

    tblBody.appendChild(trTotal);
}
function inHoaDon(loaiXe, soKm, thoiGianCho, giaCho, arrayPrice, tongTien){
    var tblBody = document.getElementById("tblBody")
    tblBody.innerHTML = "" //reset lai bang

    if(soKm <= 1){
        renderRowChiTietKm(loaiXe,[1], arrayPrice, tblBody);
    }
    else if(soKm > 1 && soKm <=20){
        renderRowChiTietKm(loaiXe, [1, soKm - 1], arrayPrice, tblBody)
    }
    else if(soKm > 20){
        renderRowChiTietKm(loaiXe,[1,19,soKm-20],arrayPrice, tblBody)
    }

    // in
    //  thoi gian cho 
    if(thoiGianCho > 2){
        renderRowThoiGianCho(thoiGianCho, giaCho, tblBody)
    }

    // tong tien 
    renderRowTongCong(tongTien, tblBody);
}
document.getElementById("btnInHD").onclick = function(){
    var kq =  getData();
    var tongTien = tinhTongTien();
    var loaiXe = kiemtraLoaiXe();
    switch(loaiXe){
        case "uberX":
            inHoaDon(loaiXe, kq[0], kq[1], GIA_CHO_UBER_X, ARRAY_GIA_UBER_X, tongTien);
        break;
        case "uberSUV":
            inHoaDon(loaiXe, kq[0], kq[1], GIA_CHO_SUV, ARRAY_GIA_SUV, tongTien);
        break;
        case "uberBlack":
            inHoaDon(loaiXe, kq[0], kq[1], GIA_CHO_BLACK, ARRAY_GIA_BLACK, tongTien);
        break;
        default: 
        alert("Vui long chon loai xe")
    }
}
function getData(){
    var kq = [];
    var sokm = document.getElementById("soKM").value;
    sokm = parseFloat(sokm)
    kq.push(sokm);
    var thoiGianCho = document.getElementById("thoiGianCho").value;
    thoiGianCho = parseFloat(thoiGianCho);
    kq.push(thoiGianCho);
    return kq;
}