var _Num1, _Num2, _Num3, _Num4;
var ArrList = [];
var ArrList2 = [];
var ArrRest = [];
var bCursor = false; var bColor = false;
var iTry = 0;

var tiempo = { hora: 0, minuto: 0, segundo: 0 };
var tiempo_corriendo = null;

function SelectDinamic() {
    _Num1 = Math.floor((Math.random() * 6));
    ArrList.push(_Num1);
    _Num2 = Math.floor((Math.random() * 6));
    ArrList.push(_Num2);
    _Num3 = Math.floor((Math.random() * 6));
    ArrList.push(_Num3);
    _Num4 = Math.floor((Math.random() * 6));
    ArrList.push(_Num4);    

    $("#ddlO1").select2({
        templateResult: addUserPic,
        templateSelection: addUserPic
    });
    $("#ddlO2").select2({
        templateResult: addUserPic,
        templateSelection: addUserPic
    });
    $("#ddlO3").select2({
        templateResult: addUserPic,
        templateSelection: addUserPic
    });
    $("#ddlO4").select2({
        templateResult: addUserPic,
        templateSelection: addUserPic
    });
}



function addUserPic(opt) {
    if (!opt.id) {
        return opt.text;
    }
    var optimage = $(opt.element).data('image');
    if (!optimage) {
        return opt.text;
    } else {
        var $opt = $(
            '<span class="userName"><img style="margin-bottom: 5px;" width="20" height="20" src="' + optimage + '" /> ' + $(opt.element).text() + '</span>'
        );
        return $opt;
    }
};

function ExcecuteProcess()
{    
    if(iTry==0)
    {
        CalculateTime();
    }
    if(iTry == 6)
    {
        clearInterval(tiempo_corriendo);
        Notify('Se han agotado sus oportunidades!!!!', 'top-right', '5000', 'info', 'fa-danger', true); return false;
    }
    var ArrI = [];
    ArrList2 = [];
    ArrList2.push(parseInt($("#ddlO1").val()));
    ArrList2.push(parseInt($("#ddlO2").val()));
    ArrList2.push(parseInt($("#ddlO3").val()));
    ArrList2.push(parseInt($("#ddlO4").val()));
    var pi=0;
    var pj=0;
    
   
    for (var i = pi; i < ArrList2.length; i++) {
        for (var j = pj; j < ArrList.length; j++) {
            if(ArrList2[i] === ArrList[j] && i===j)
            {                    
                    ArrI.push(2);
                    pi = pi + 1;
                    pj = pj + 1;
                    break;                                                                            
            }
            else if(ArrList2[i] === ArrList[j] && i!=j)
            {                
                ArrI.push(1);   
                pi = pi + 1;
                pj = pj + 1; 
                break; 
            }
            else
            {
                bCursor = false;  
                if(j == (ArrList.length-1))
                {                    
                    for (var k = 0; k < pi; k++) {
                        if(ArrList2[i] === ArrList[k])
                        {      
                            bCursor = true;                      
                            ArrI.push(1);   
                            pi = pi + 1;
                            pj = pj + 1; 
                            break; 
                        }
                    }
                    if(!bCursor)
                    {
                        ArrI.push(0);    
                        pi = pi + 1;
                        pj = pj + 1;
                        break;
                    }
                }                 
            }            
        }        
    }    

    ArrRest.push({ pos1: ArrI[0], pos2: ArrI[1], pos3: ArrI[2], pos4: ArrI[3]});    
    var str = '<tr><td rowspan="2" align="center"><img src="img/'+ ArrList2[0] +'.png" width="25" height="25" style="margin-top: 15px;"/></td><td rowspan="2" align="center"><img src="img/'+ ArrList2[1] +'.png" width="25" height="25" style="margin-top: 15px;"/></td><td rowspan="2" align="center"><img src="img/'+ ArrList2[2] +'.png" width="25" height="25" style="margin-top: 15px;"/></td><td rowspan="2" align="center"><img src="img/'+ ArrList2[3] +'.png" width="25" height="25" style="margin-top: 15px;"/></td><td align="center">'+ GetAnswer(ArrRest[iTry].pos1) +'</td><td align="center">'+ GetAnswer(ArrRest[iTry].pos2) +'</td></tr><tr><td align="center">'+ GetAnswer(ArrRest[iTry].pos3) +'</td><td align="center">'+ GetAnswer(ArrRest[iTry].pos4) +'</td></tr>';        
    $("#tblBoard tbody").append(str);    

    if(parseInt(ArrRest[iTry].pos1) == 2 && parseInt(ArrRest[iTry].pos2) == 2 && parseInt(ArrRest[iTry].pos3) == 2 && parseInt(ArrRest[iTry].pos4) == 2)
    {
        clearInterval(tiempo_corriendo);
        Notify('Haz Ganado!!!!', 'top-right', '5000', 'info', 'fa-success', true); return false;
    }
    else{
        iTry = iTry + 1;
    }    
}

function GetAnswer(_val)
{
    if(parseInt(_val) == 2)
    {
        return '<img src="img/red.png" width="25" height="25"/>';
    }
    if(parseInt(_val) == 1)
    {
        return '<img src="img/Black.png" width="25" height="25"/>';
    }
    else
    {
        return '<span>-</span>'
    }
}

function CalculateTime()
{
    tiempo_corriendo = setInterval(function(){
        // Segundos
        tiempo.segundo++;
        if(tiempo.segundo >= 60)
        {
            tiempo.segundo = 0;
            tiempo.minuto++;
        }      

        // Minutos
        if(tiempo.minuto >= 60)
        {
            tiempo.minuto = 0;
            tiempo.hora++;
        }

        $("#hour").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
        $("#minute").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
        $("#second").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
    }, 1000);
}

function ShowAll()
{
    $("#_Solu").html('<img src="img/'+ _Num1 +'.png" width="40" height="40" style="margin-top: 15px;"/>&nbsp;&nbsp;<img src="img/'+ _Num2 +'.png" width="40" height="40" style="margin-top: 15px;"/>&nbsp;&nbsp;<img src="img/'+ _Num3 +'.png" width="40" height="40" style="margin-top: 15px;"/>&nbsp;&nbsp;<img src="img/'+ _Num4 +'.png" width="40" height="40" style="margin-top: 15px;"/>');
}