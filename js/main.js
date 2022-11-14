let oldWinWidth = 0;
let oldWinHeight = 0;
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;
let agent = navigator.userAgent.toLowerCase();

let nowInterval;
let blockInterval;
let prefieInterval;
let watresInterval;
let watquaBlockInterval;
let watquaEndInterval;
let watercutInterval;
let trandInterval;

let trandCtx;
let trandChart;
let trandData = [];

let abnmonEventGrid;
let nigminGrid;
let watfloBlockGrid;
let watfloMonthGrid;
let totproGrid;
let amoleaGrid;
let watpreFluxGrid;
let watprePressureGrid;
let meainsPointGrid;
let meainsMachineGrid;
let meainsNewtagGrid;
let meainsInfotagGrid;
let mapLedgerGrid;
let mapLedger2Grid;
let mapInfoGrid;
let mapWatercutGrid;

//20220719 수정부분 start
let mapWatersupplyGrid;
//20220719 수정부분 end

//20220720 수정부분 start
let edidatUserGrid;
let edidatFacilityGrid;
let bueddaUserGrid;
let bueddaFacilityGrid;
let datbacGrid;
let mapdatGrid;
//20220720 수정부분 end

//20220926 수정부분 start
let disdiaGrid;
//20220926 수정부분 end

$(function() {
    //20220711 수정부분 start
    //ios(아이폰, 아이패드, 아이팟) 전용 css 적용
    if (agent.indexOf("iphone") > -1 || agent.indexOf("ipad") > -1 || agent.indexOf("ipod") > -1) {
        var cssIosLink = document.createElement("link");
        
        //20220712 수정부분 start
        cssIosLink.href = "css/main-ios.css";
        //20220712 수정부분 end
        
        cssIosLink.async = false;
        cssIosLink.rel = "stylesheet";
        cssIosLink.type = "text/css";
        
        document.head.appendChild(cssIosLink);
    }
    //20220711 수정부분 end
    
    //20221028 수정부분 start
	//관망도조회 안드로이드나 ios일 경우 인쇄하기&파일저장&인덱스맵 아이콘 버튼 숨기기
	if (agent.indexOf("android") > -1) {
		//안드로이드
		$(".c-map .map-icon-list>li.android-map-hidden").css("display","none");
	} else if (agent.indexOf("iphone") > -1 || agent.indexOf("ipad") > -1 || agent.indexOf("ipod") > -1) {
		//ios(아이폰, 아이패드, 아이팟)
		$(".c-map .map-icon-list>li.android-map-hidden").css("display","none");
	} else {
		$(".c-map .map-icon-list>li.android-map-hidden").css("display","");
	}
	//20221028 수정부분 end
    
    //20221111 수정부분 start
    //안드로이드나 ios일 경우 풋터 숨기기
	if (agent.indexOf("android") > -1) {
		//안드로이드
		$(".m-wrap").addClass("android-wrap");
	} else if (agent.indexOf("iphone") > -1 || agent.indexOf("ipad") > -1 || agent.indexOf("ipod") > -1) {
		//ios(아이폰, 아이패드, 아이팟)
		$(".m-wrap").addClass("android-wrap");
	} else {
		$(".m-wrap").removeClass("android-wrap");
	}
    //20221111 수정부분 end
    
    //리사이즈
    $(window).resize(function() {
        oldWinWidth = winWidth;
        oldWinHeight = winHeight;
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
        
        //너비에 따른 디바이스 변경여부 (스마트폰 > 테블릿 또는 테블릿 > 스마트폰)
        var deviceChageFlag = (oldWinWidth > 0 && ((oldWinWidth < 768 && winWidth > 767) || (oldWinWidth > 767 && winWidth < 768))) ? true : false;
        
        //검색방법 선택결과 초기화
        if ($(".c-search-type").length > 0) {
            var dataKind = $(".c-search-type select").attr("data-kind");
            var searchType = $(".c-search-type select").val();
            
            if ((winWidth < 768 && searchType == "multiple") || (dataKind == "prefie" && deviceChageFlag)) {
                $(".c-search-type select option").eq(0).prop("selected",true);

                setSearchType($(".c-search-type select"));
            }
        }
        
        //트렌드분석 차트 리사이즈시 시간축 개수 설정
        if ($("#trandChart").length > 0) {
            setTrandChartResize();
        }
        
        //20220719 수정부분 start
        //커스텀 셀렉트박스 리사이즈시 옵션 위치 설정
        if ($(".c-select-area").length > 0) {
            $(".c-select-area").each(function() {
                if ($(this).find(".c-select-list.on").length > 0) {
                    showSelectOption($(this).find(".c-select-list.on"),"resize")
                }
            });
        }
        //20220719 수정부분 end
        
        //20220803 수정부분 start
        //관망도조회 레이어 팝업 사이즈 변경시 클래스 설정
        $(".map-layer-wrap.on").each(function() {
            if ($(this).hasClass("map-layer01") || $(this).hasClass("map-layer03") || $(this).hasClass("map-layer07")) {
                if ($(this).width() < 494) {
                    $(this).addClass("map-shorter-layer");
                    $(this).removeClass("map-short-layer");
                } else if ($(this).width() < 940) {
                    $(this).addClass("map-short-layer");
                    $(this).removeClass("map-shorter-layer");
                } else {
                    $(this).removeClass("map-short-layer map-shorter-layer");
                }
            } else if ($(this).hasClass("map-layer02")) {
                if ($(this).width() > 940) {
                    $(this).addClass("map-long-layer");
                } else {
                    $(this).removeClass("map-long-layer");
                }
            } else if ($(this).hasClass("map-layer04")) {
                if ($(this).width() < 313) {
                    $(this).addClass("map-shorter-layer");
                    $(this).removeClass("map-short-layer");
                } else if ($(this).width() < 480) {
                    $(this).addClass("map-short-layer");
                    $(this).removeClass("map-shorter-layer");
                } else {
                    $(this).removeClass("map-short-layer map-shorter-layer");
                }
            }
        });
        //20220803 수정부분 end
        
        //20220926 수정부분 start
        //20221101 수정부분 start
        //관망도조회 인쇄하기창 리사이즈시 이미지에 클래스 설정
        if ($("#map-screenshot img").length > 0) {
            var screenshotAreaHeight = $("#map-screenshot").height();
            var screenshotCanvasHeight = $("#map-screenshot").find("img").height();
            
            if (screenshotAreaHeight > screenshotCanvasHeight) {
                $("#map-screenshot").addClass("not-over");
            } else {
                $("#map-screenshot").removeClass("not-over");
            }
        }
        //20221101 수정부분 end
        //20220926 수정부분 end
    });
    
    //헤더 사용자메뉴창 보이기&숨기기
    $("header.header .header-user-btn").off().on("click",function() {
        if ($(this).next(".header-user-list").hasClass("on")) {
            $(this).next(".header-user-list").removeClass("on");
        } else {
            $(this).next(".header-user-list").addClass("on");
        }
    });
    
    //헤더 전체메뉴창 열기
    $("header.header .header-menu-btn").click(function() {
        $("nav.nav").addClass("on");

        var scrollTop = parseInt($(document).scrollTop());

        $("body").css("top", -scrollTop + "px");

        $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
            event.preventDefault();
        });
    });
    
    //파일선택시 파일명 추출
    $(".c-file-area input[type='file']").on("change", function() {
        var filename = "";
        
        if (window.FileReader) {
            //기본 브라우저
            filename = $(this)[0].files[0].name;
        } else {
            //old IE
            filename = $(this).val().split('/').pop().split('\\').pop();
        }
        
        $(this).closest(".c-file-area").find("input[type='text']").val(filename);
    });
    
    //전체 체크&체크해제
    $("input[type='checkbox'][id$='All']").click(function() {
        var idName = $(this).attr("id").slice(0,-3);
        
        if (idName != "" && idName != undefined) {
            if ($(this).is(":checked")) {
                $("input[type='checkbox'][id^='" + idName + "']").prop("checked",true);
            } else {
                $("input[type='checkbox'][id^='" + idName + "']").prop("checked",false);
            }
        }
    });
    
    //datepicker 설정
    $(".c-date-input").each(function() {
        $(this).datepicker();
    });
    
    //20220720 수정부분 start
    //datetimepicker 설정
    $(".c-datetime-input").each(function() {
        $(this).datetimepicker({
            controlType: 'select',
            oneLine: true,
            timeFormat: 'HH:mm',
            closeText: '닫기'
        });
    });
    //20220720 수정부분 end
    
    //yearpicker 설정
    $(".c-year-input").each(function() {
        $(this).yearpicker();
    });
    
    //20220715 수정부분 start
    //colorpicker 설정
    $(".c-color-input").each(function() {
        $(this).spectrum({
            type: "component",
            preferredFormat: "hex",
            showPalette: false,
            showAlpha: false
        });
    });
    
    //input range 슬라이드 설정
    $(".c-range-area").each(function() {
        setRangeSlider($(this));
    });
    
    //input number 입력창에 숫자만 입력
    $(".c-number-area .c-number-input").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9-]/g,""));
        
        var numberMin = parseInt($(this).attr("min"));
        var numberMax = parseInt($(this).attr("max"));
        var numberVal = $(this).val();
        
        if ($.isNumeric(numberVal)) {
            numberVal = parseInt($(this).val())
            
            numberVal = ($.isNumeric(numberMin)) ? Math.max(numberVal, numberMin) : numberVal;
            numberVal = ($.isNumeric(numberMax)) ? Math.min(numberVal, numberMax) : numberVal;
            
            $(this).val(numberVal);
        } else if (numberVal != "" && numberVal != "-") {
            if ($.isNumeric(numberMin)) {
                $(this).val(numberMin);
            } else {
                $(this).val(0);
            }
        }
    });
    
    //커스텀 셀렉트박스 초기화
    if ($(".c-select-area").length > 0) {
        $(".c-select-area").each(function() {
            if ($(this).find(".c-select-list").children("li").find("input[type='radio']").is(":checked")) {
                selSelectOption($(this).find(".c-select-list").children("li").find("input[type='radio']:checked"));
            } else {
                $(this).find(".c-select-list").children("li").find("input[type='radio']").eq(0).prop("checked",true);
                
                selSelectOption($(this).find(".c-select-list").children("li").find("input[type='radio']").eq(0));
            }
        });
    }
    
    //커스텀 셀렉트박스 옵션 보이기&숨기기
    $(".c-select-area .c-select-input").click(function() {
        //20220719 수정부분 start
        showSelectOption($(this),"click");
        //20220719 수정부분 end
    });
    
    //커스텀 셀렉트박스 옵션 선택
    $(".c-select-area .c-select-list>li input[type='radio']").click(function() {
        selSelectOption($(this));
    });
    //20220715 수정부분 end
    
    //레이어 팝업 이동가능하게 설정
    $(".map-layer-wrap").each(function() {
        $(this).draggable({
            containment: '.c-content-area',
            handle: '.map-layer-tit'
        }).mousedown(function() {
            //20220711 수정부분 start
            var mapLayerObj = $(this);
            var maxIndex = 13;
            $(".map-layer-wrap.on").each(function() {
                if (parseInt($(this).attr("data-max-index")) >= maxIndex && mapLayerObj[0] !== $(this)[0]) {
                    maxIndex = parseInt($(this).attr("data-max-index")) + 1;
                }
            });
            
            /*$(".map-layer-wrap").css("z-index", 13);
            $(this).css("z-index", 15);*/
            $(this).css("z-index", maxIndex);
            $(this).attr("data-max-index", maxIndex);
            //20220711 수정부분 end
        });
        
        //20220803 수정부분 start
        //20220926 수정부분 start
        if (!$(this).hasClass("map-layer00") && !$(this).hasClass("map-layer05") && !$(this).hasClass("map-layer08")) {
        //20220926 수정부분 end
            
            $(this).resizable({
                containment: '.c-content-area'
            });
        }
        //20220803 수정부분 end
    });
    
    //좌측에 검색영역 보이기&숨기기
    $(".c-search-wrap .c-search-aside-btn").off().on("click",function() {
        if ($(this).parent(".c-search-wrap").hasClass("on")) {
            $(this).parent(".c-search-wrap").removeClass("on");
        } else {
            $(this).parent(".c-search-wrap").addClass("on");
        }
    });
    
    //좌측에 검색영역에서 블록 리스트 보이기&숨기기
    $("aside.aside .aside-list-area .aside-list>li .aside-list-tit:not(.aside-last-list>li .aside-list-tit)").off().on("click",function(event) {
        if ((($(this).find("input").length > 0 && !$(event.target).is("label")) || ($(this).find("input").length == 0)) && !$(event.target).is("input")) {
            event.preventDefault();
            
            if ($(this).parent("li").hasClass("on")) {
                $(this).parent("li").removeClass("on");
            } else {
                $(this).parent("li").parent("ul").find("li").removeClass("on");
                $(this).parent("li").addClass("on");
            }
        }
    });
    
    //좌측에 검색영역에서 블록을 1개만 선택해야 하는 경우
    $("aside.aside .aside-single-area .aside-list>li .aside-list-tit .aside-list-check input[type='checkbox']").click(function() {
        if ($(this).closest(".aside-single-area").find("input[type='checkbox']:checked").length > 1) {
            $(this).closest(".aside-single-area").find("input[type='checkbox']").prop("checked",false);
            $(this).prop("checked",true);
        }
    });
    
    //다중검색 전체항목 보이기&숨기기
    $("#search-result-multiple .search-multiple-btn").off().on("click",function() {
        if ($(this).parent(".search-result-con").hasClass("on")) {
            $(this).parent(".search-result-con").removeClass("on");
        } else {
            $(this).parent(".search-result-con").addClass("on");
        }
    });
    
    //관망도조회 하단바 모두 보이기&숨기기
    $(".c-map .map-bottom-bar-area .map-bottom-bar-item").eq(0).off().on("click",function(event) {
        if (!$(event.target).is("select")) {
            if (winWidth < 992) {
                if ($(this).closest(".c-map").hasClass("on")) {
                    $(this).closest(".c-map").removeClass("on");
                } else {
                    $(this).closest(".c-map").addClass("on");
                }
            }
        }
    });
    
    //메인 현재 날짜시간 가져오기
    if ($("#v-datetime").length > 0) {
        getNowDatetime();
    }
    
    //검색방법 선택결과 초기화
    if ($(".c-search-type").length > 0) {
        $(".c-search-type select option").eq(0).prop("selected",true);
        
        setSearchType($(".c-search-type select"));
    }
    
    //배수지관망감시 데이터 가져오기
    if ($("#v-watres-data").length > 0) {
        getWatresDataResult();
    }
    
    //야간최소유량 분석 그리드 그리기
    if ($("#nigmin-grid-area").length > 0) {
        setNigminGrid();
    }
    
    //유수율 분석 그리드 그리기
    if ($("#watflo-block-grid-area").length > 0 && $("#watflo-month-grid-area").length > 0) {
        setWatfloGrid();
    }
    
    //총괄수량수지 분석 그리드 그리기
    if ($("#totpro-grid-area").length > 0) {
        setTotproGrid();
    }
    
    //누수량 분석 그리드 그리기
    if ($("#amolea-grid-area").length > 0) {
        setAmoleaGrid();
    }
    
    //수압 분석 그리드 그리기
    if ($("#watpre-flux-grid-area").length > 0 && $("#watpre-pressure-grid-area").length > 0) {
        setWatpreGrid();
    }
    
    //계측기 현황의 지점 목록 그리드 그리기
    if ($("#meains-point-grid-area").length > 0) {
        setMeainsPointGrid();
    }
    
    //20220720 수정부분 start
    //편집데이터 관리에서 사용자 편집이력 그리드 그리기
    if ($("#edidat-user-grid-area").length > 0) {
        setEdidatUserGrid();
    }
    
    //편집데이터 관리에서 시설물 편집이력 그리드 그리기
    if ($("#edidat-facility-grid-area").length > 0) {
        setEdidatFacilityGrid();
    }
    
    //사업소편집데이터 관리에서 사용자 편집이력 그리드 그리기
    if ($("#buedda-user-grid-area").length > 0) {
        setBueddaUserGrid();
    }
    
    //사업소편집데이터 관리에서 시설물 편집이력 그리드 그리기
    if ($("#buedda-facility-grid-area").length > 0) {
        setBueddaFacilityGrid();
    }
    
    //데이터백업 관리 그리드 그리기
    if ($("#datbac-grid-area").length > 0) {
        setDatbacGrid();
    }
    
    //지도출력데이터 관리 그리드 그리기
    if ($("#mapdat-grid-area").length > 0) {
        setMapdatGrid();
    }
    //20220720 수정부분 end
    
    //20220926 수정부분 start
    //수계전환 그리드 그리기
    if ($("#disdia-grid-area").length > 0) {
        setDisdiaGrid();
    }
    //20220926 수정부분 end
});

//실시간으로 메인 현재 날짜시간 가져오기
if ($("#v-datetime").length > 0) {
    nowInterval = setInterval(function() {
        getNowDatetime();
    }, 1000);
}

//메인 현재 날짜시간 가져오기
function getNowDatetime() {
    var nowDate = new Date();
    var weekArr = new Array('일', '월', '화', '수', '목', '금', '토');
    var year = nowDate.getFullYear();
    var month = ('0' + (nowDate.getMonth() + 1)).slice(-2);
    var day = ('0' + nowDate.getDate()).slice(-2);
    var hour = ('0' + nowDate.getHours()).slice(-2);
    var minute = ('0' + nowDate.getMinutes()).slice(-2);
    var second = ('0' + nowDate.getSeconds()).slice(-2);
    var week = nowDate.getDay();
    
    $("#v-datetime").html(year + "/" + month + "/" + day + " (" + weekArr[week] + ") " + hour + ":" + minute + ":" + second);
}

//파일 삭제
function delFile(obj) {
    var fileObj = $(obj).prev(".c-file-area").find("input[type='file']");
    
    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
        //브라우저가 ie일 경우
        $(fileObj).replaceWith($(fileObj).clone(true));
    } else {
        //브라우저가 ie가 아닐 경우
        $(fileObj).val("");
    }
    
    $(fileObj).closest(".c-file-area").find("input[type='text']").val("");
}

//검색기간 선택시 시작일, 종료일 설정
function setSearchDate(startDateId,endDateId,term) {
    if ($("#" + startDateId).length > 0 && $("#" + endDateId).length > 0) {
        var termState = term.substr(0,1); //기간을 더할지 뺄지 설정
        var termNum = parseInt(term.substr(1,(term.length - 2))); //기간을 얼마나 계산할지 설정
        var termUnit = term.substr(-1); //년/월/일 설정
        var nowDate = new Date();
        var startDate = new Date();
        var endDate = new Date();

        if (termNum != "NaN") {
            if (termUnit == "y") {
                //년도 계산
                if (termState == "+") {
                    endDate = new Date(nowDate.setFullYear(nowDate.getFullYear() + termNum));
                } else if (termState == "-") {
                    startDate = new Date(nowDate.setFullYear(nowDate.getFullYear() - termNum));
                }
            } else if (termUnit == "m") {
                //월 계산
                if (termState == "+") {
                    endDate = new Date(nowDate.setMonth(nowDate.getMonth() + termNum));
                } else if (termState == "-") {
                    startDate = new Date(nowDate.setMonth(nowDate.getMonth() - termNum));
                }
            } else if (termUnit == "d") {
                //일 계산
                if (termState == "+") {
                    endDate = new Date(nowDate.setDate(nowDate.getDate() + termNum));
                } else if (termState == "-") {
                    startDate = new Date(nowDate.setDate(nowDate.getDate() - termNum));
                }
            } else {
                return false;
            }
            
            var startDateYear = startDate.getFullYear();
            var startDateMonth = startDate.getMonth() + 1;
            var startDateDay = startDate.getDate();
            var endDateYear = endDate.getFullYear();
            var endDateMonth = endDate.getMonth() + 1;
            var endDateDay = endDate.getDate();
            
            $("#" + startDateId).datepicker({format:"yyyy-mm-dd"}).datepicker("setDate",new Date(startDateYear,startDateMonth,startDateDay));
            $("#" + endDateId).datepicker({format:"yyyy-mm-dd"}).datepicker("setDate",new Date(endDateYear,endDateMonth,endDateDay));
        }
    }
}

//검색기간 선택시 시작년, 종료년 설정
function setSearchYear(startDateId,endDateId,term) {
    if ($("#" + startDateId).length > 0 && $("#" + endDateId).length > 0) {
        var termArr = term.split('/');
        
        if (termArr.length > 1) {
            var termStart = parseInt(termArr[0]); //시작년과 금년 사이의 값 (금년이전 : 음수, 금년 : 0 또는 무효값, 금년다음 : 양수)
            var termEnd = parseInt(termArr[1]); //종료년과 금년 사이의 값 (금년이전 : 음수, 금년 : 0 또는 무효값, 금년다음 : 양수)
            var nowDate = new Date();
            var startYear;
            var endYear;
            
            termStart = (termStart != "NaN") ? termStart : 0;
            termEnd = (termEnd != "NaN") ? termEnd : 0;
            
            if (termStart < 0) {
                startYear = nowDate.getFullYear() - Math.abs(termStart);
            } else {
                startYear = nowDate.getFullYear() + Math.abs(termStart);
            }

            if (termEnd < 0) {
                endYear = nowDate.getFullYear() - Math.abs(termEnd);
            } else {
                endYear = nowDate.getFullYear() + Math.abs(termEnd);
            }
            
            $("#" + startDateId).yearpicker("setValue",startYear);
            $("#" + endDateId).yearpicker("setValue",endYear);
        }
    }
}

//20220715 수정부분 start
//input number 입력값 더하기&빼기
function setNumberInput(obj,type) {
    var numberObj = $(obj).closest(".c-number-area").find(".c-number-input");
    var numberMin = parseInt($(numberObj).attr("min"));
    var numberMax = parseInt($(numberObj).attr("max"));
    var numberStep = parseInt($(numberObj).attr("step"));
    var numberVal = parseInt($(numberObj).val());
    
    if ($.isNumeric(numberVal)) {
        var numberVal2 = 0;
        numberStep = ($.isNumeric(Math.abs(numberStep))) ? Math.abs(numberStep) : 1;
        
        if (type == "+") {
            numberVal2 = numberVal + numberStep;
        } else if (type == "-") {
            numberVal2 = numberVal - numberStep;
        }
        
        numberVal2 = ($.isNumeric(numberMin)) ? Math.max(numberVal2, numberMin) : numberVal2;
        numberVal2 = ($.isNumeric(numberMax)) ? Math.min(numberVal2, numberMax) : numberVal2;

        $(numberObj).val(numberVal2);
    } else {
        if ($.isNumeric(numberMin)) {
            $(numberObj).val(numberMin);
        } else {
            $(numberObj).val(0);
        }
    }
}

//input range 슬라이드 설정
function setRangeSlider(obj) {
    if ($(obj).find(".c-range-right").length > 0) {
        var inputRight = $(obj).find(".c-range-right")[0];
        var inputLeft;

        var thumbRight = $(obj).find(".c-custom-slider").children(".thumb.right")[0];
        var thumbRightTxt;
        var thumbLeft;
        var thumbLeftTxt;

        var range = $(obj).find(".c-custom-slider").children(".range")[0];

        if ($(obj).find(".c-custom-slider").children(".thumb.right").children(".thumb-txt").length > 0) {
            thumbRightTxt = $(obj).find(".c-custom-slider").children(".thumb.right").children(".thumb-txt")[0];
        }

        if ($(obj).find(".c-range-left").length > 0) {
            inputLeft = $(obj).find(".c-range-left")[0];
            thumbLeft = $(obj).find(".c-custom-slider").children(".thumb.left")[0];

            if ($(obj).find(".c-custom-slider").children(".thumb.left").children(".thumb-txt").length > 0) {
                thumbLeftTxt = $(obj).find(".c-custom-slider").children(".thumb.left").children(".thumb-txt")[0];
            }
        }

        if (thumbRightTxt != undefined || thumbLeftTxt != undefined) {
            $(obj).addClass("view");
        }
        
        if ($(obj).find(".c-range-txt").length > 0) {
            if ($(obj).find(".c-range-txt").children(".left-txt").html() == "") {
                $(obj).find(".c-range-txt").children(".left-txt").html(inputRight.min);
            }
            
            if ($(obj).find(".c-range-txt").children(".right-txt").html() == "") {
                $(obj).find(".c-range-txt").children(".right-txt").html(inputRight.max);
            }
        }

        var setRightValue = () => {
            var _this = inputRight;
            var [min, max] = [parseInt(_this.min), parseInt(_this.max)];

            if ($(obj).find(".c-range-left").length > 0) {
                //교차되지 않게, 1을 더해준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해
                _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);
            } else {
                _this.value = parseInt(_this.value);
            }

            //input, thumb 같이 움직이도록
            var percent = ((_this.value - min) / (max - min)) * 100;
            thumbRight.style.right = 100 - percent + "%";
            range.style.right = 100 - percent + "%";

            if (thumbRightTxt != undefined) {
                thumbRightTxt.innerText = _this.value;
            }
        };

        if ($(obj).find(".c-range-left").length > 0) {
            var setLeftValue = () => {
                var _this = inputLeft;
                var [min, max] = [parseInt(_this.min), parseInt(_this.max)];

                //교차되지 않게, 1을 빼준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해
                _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

                //input, thumb 같이 움직이도록
                var percent = ((_this.value - min) / (max - min)) * 100;
                thumbLeft.style.left = percent + "%";
                range.style.left = percent + "%";

                if (thumbLeftTxt != undefined) {
                    thumbLeftTxt.innerText = _this.value;
                }
            };
        }

        window.addEventListener("load",setRightValue);
        inputRight.addEventListener("input",setRightValue);

        if ($(obj).find(".c-range-left").length > 0) {
            window.addEventListener("load",setLeftValue);
            inputLeft.addEventListener("input",setLeftValue);
        }
    }
}

//20220719 수정부분 start
//커스텀 셀렉트박스 옵션 보이기&숨기기
function showSelectOption(obj,type) {
    var selectObj = $(obj).closest(".c-select-area");
    
    if ($(obj).closest(".layer-con-area").length > 0) {
        var wrapTop = parseInt($(obj).closest(".layer-con-area").offset().top);
        var wrapHeight = parseInt($(obj).closest(".layer-con-area").outerHeight());
        var selectTop = parseInt($(selectObj).offset().top) + parseInt($(selectObj).find(".c-select-input").outerHeight());
        var selectHeight = parseInt($(selectObj).find(".c-select-list").outerHeight());
        
        var topGap = selectTop - wrapTop;
        var bottomGap = (wrapTop + wrapHeight) - selectTop;
        
        if (topGap > selectHeight && bottomGap < selectHeight) {
            $(selectObj).find(".c-select-list").addClass("up");
        } else {
            $(selectObj).find(".c-select-list").removeClass("up");
        }
    }
    
    if (type == "click") {
        if ($(selectObj).find(".c-select-list").hasClass("on")) {
            $(selectObj).find(".c-select-list").removeClass("on");
        } else {
            $(selectObj).find(".c-select-list").addClass("on");
        }
    }
}
//20220719 수정부분 end

//20220727 수정부분 start
function setStatsExpand(obj) {
    if ($(obj).closest("li").hasClass("expand")) {
        $(obj).closest("li").removeClass("expand");
        $(obj).find("img").attr("src","img/arrow-expand-all.svg");
        $(obj).find("img").attr("alt","통계 확대");
    } else {
        $(obj).closest("li").addClass("expand");
        $(obj).find("img").attr("src","img/arrow-collapse-all.svg");
        $(obj).find("img").attr("alt","통계 축소");
    }
}
//20220727 수정부분 end

//커스텀 셀렉트박스 옵션 선택
function selSelectOption(obj) {
    var selectObj = $(obj).closest(".c-select-area");
    var selSelectTxt = $(obj).next("label").html();
    
    $(selectObj).find(".c-select-input").html(selSelectTxt);
    $(selectObj).find(".c-select-list").removeClass("on");
}
//20220715 수정부분 end

//20221028 수정부분 start
//문자전송 수신자삭제
function delMessageReceiver(obj) {
    $(obj).closest("li").remove();
}
//20221028 수정부분 end

//검색방법 선택결과 초기화
function setSearchType(obj) {
    var dataKind = $(obj).attr("data-kind");
    var searchType = $(obj).val();
    
    $(".c-search-result .search-result-item").removeClass("on");
    $("#search-result-single select option").eq(0).prop("selected",true);
    $("#search-result-multiple .search-multiple-list>li input[type='checkbox']").prop("checked",false);
    
    if (searchType == "single") {
        $("#search-result-single").addClass("on");
    } else if (searchType == "multiple") {
        $("#search-result-multiple").addClass("on");
    }
    
    if (dataKind == "block") {
        //블록관망감시
        $(".search-result-data #v-block-data table tbody").html("");
        
        getBlockData(searchType);
    } else if (dataKind == "prefie") {
        //가압장관망감시
        $(".search-result-data #v-prefie-data table").html("");
        $(".search-result-data #v-prefie-watpre-data table tbody").html("");
        
        getPrefieData(searchType);
    } else if (dataKind == "watquaBlock") {
        //블록수질감시
        $(".search-result-data #v-watqua-block-data table").html("");
        
        getWatquaBlockData(searchType);
    }
}

//depth 단계 내용 보이기
function showContentDivide(depth) {
    var depthNum = (depth - 1 > 0) ? (depth - 1) : 0;
    
    $(".c-content-divide .content-divide-item").removeClass("on");
    $(".c-content-divide .content-divide-item").eq(depthNum).addClass("on");
}

//블록관망감시 검색항목 가져오기
function getBlockData(searchType) {
    var dataAssign = $(".c-search-type select").attr("data-assign");
    var selectedArr = [];
    
    clearInterval(blockInterval);
    
    if (searchType == "single") {
        var selectedVal = $("#search-result-single select").val();
        
        if (selectedVal != "" && selectedVal != undefined) {
            selectedArr.push(selectedVal);
        }
    } else if (searchType == "multiple") {
        $("#search-result-multiple .search-result-con").removeClass("on");
        
        $("#search-result-multiple .search-multiple-list>li input[type='checkbox']").each(function() {
            if ($(this).is(':checked')) {
                var selectedVal = $(this).val();

                if (selectedVal != "" && selectedVal != undefined) {
                    selectedArr.push(selectedVal);
                }
            }
        });
    }
    
    getBlockDataResult(dataAssign,selectedArr);
}

//블록관망감시 검색결과 데이터 가져오기
function getBlockDataResult(dataAssign,selectedArr) {
    var dataHtml = "";
    
    //데이터 가져오기
    //블록관망감시 데이터
    for (var i=0; i<selectedArr.length; i++) {
        //이상이 있을 경우 <tr>에 'danger' 클래스 추가
        dataHtml += "<tr class='" + (i == 1 ? "danger" : "") + "'>";
        dataHtml += "   <td>" + selectedArr[i] + "</td>";
        dataHtml += "   <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0000.0</a></td>";
        dataHtml += "   <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.0</a></td>";
        dataHtml += "</tr>";
    }

    $(".search-result-data #v-block-data table tbody").html(dataHtml);
    
    if (selectedArr.length > 0) {
        blockInterval = setInterval(function() {
            clearInterval(blockInterval);
            getBlockDataResult(dataAssign,selectedArr);
        }, 60000);
    } else {
        clearInterval(blockInterval);
    }
}

//가압장관망감시 검색항목 가져오기
function getPrefieData(searchType) {
    var dataAssign = $(".c-search-type select").attr("data-assign");
    var selectedArr = [];
    
    clearInterval(prefieInterval);
    
    if (searchType == "single") {
        var selectedVal = $("#search-result-single select").val();
        
        if (selectedVal != "" && selectedVal != undefined) {
            selectedArr.push(selectedVal);
        }
    } else if (searchType == "multiple") {
        $("#search-result-multiple .search-result-con").removeClass("on");
        
        $("#search-result-multiple .search-multiple-list>li input[type='checkbox']").each(function() {
            if ($(this).is(':checked')) {
                var selectedVal = $(this).val();

                if (selectedVal != "" && selectedVal != undefined) {
                    selectedArr.push(selectedVal);
                }
            }
        });
    }
    
    getPrefieDataResult(dataAssign,selectedArr);
}

//가압장관망감시 검색결과 데이터 가져오기
//dataAssign : 관할사업소 (01 : 중부수도사업소, 02 : 남동부수도사업소, 03 : 북부수도사업소, 04 : 서부수도사업소, 05 : 강화수도사업소)
function getPrefieDataResult(dataAssign,selectedArr) {
    var dataHtml = "";
    var dataHtml2 = "";
    
    //데이터 가져오기    
    //가압장관망감시 데이터
    if (winWidth < 768) {
        dataHtml += "<colgroup>";
        dataHtml += "   <col width='1%'>";
        dataHtml += "   <col width='1%'>";
        dataHtml += "   <col width='*'>";
        dataHtml += "</colgroup>";
        
        if (selectedArr.length > 0) {
            for (var i=0; i<selectedArr.length; i++) {
                //이상이 있을 경우 <tbody>에 'danger' 클래스 추가
                dataHtml += "<tbody class='danger'>";
                dataHtml += "   <tr>";
                dataHtml += "       <th colspan='2'>가압장명</th>";
                dataHtml += "       <td>" + selectedArr[i] + "<div class='small red'>점검요망</div></td>";
                dataHtml += "   </tr>";
                dataHtml += "   <tr>";
                dataHtml += "       <th rowspan='" + (dataAssign == "05" ? "5" : "3") + "'>가압펌프상태(A)</th>";
                dataHtml += "       <th>1호기</th>";
                dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>전류 0.0</a><div class='small gray'>RUN</div></td>";
                dataHtml += "   </tr>";
                dataHtml += "   <tr>";
                dataHtml += "       <th class='c-hidden'></th>";
                dataHtml += "       <th>2호기</th>";
                dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>전류 0.0</a><div class='small gray'>RUN</div></td>";
                dataHtml += "   </tr>";
                dataHtml += "   <tr>";
                dataHtml += "       <th class='c-hidden'></th>";
                dataHtml += "       <th>3호기</th>";
                dataHtml += "       <td></td>";
                dataHtml += "   </tr>";

                if (dataAssign == "05") {
                    dataHtml += "   <tr>";
                    dataHtml += "       <th class='c-hidden'></th>";
                    dataHtml += "       <th>4호기</th>";
                    dataHtml += "       <td></td>";
                    dataHtml += "   </tr>";
                    dataHtml += "   <tr>";
                    dataHtml += "       <th class='c-hidden'></th>";
                    dataHtml += "       <th>5호기</th>";
                    dataHtml += "       <td></td>";
                    dataHtml += "   </tr>";
                }

                dataHtml += "   <tr>";
                dataHtml += "       <th rowspan='2'>배수펌프상태(A)</th>";
                dataHtml += "       <th>1호기</th>";
                dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>전류 0.0</a><div class='small gray'>STOP</div></td>";
                dataHtml += "   </tr>";
                dataHtml += "   <tr>";
                dataHtml += "       <th class='c-hidden'></th>";
                dataHtml += "       <th>2호기</th>";
                dataHtml += "       <td></td>";
                dataHtml += "   </tr>";
                dataHtml += "   <tr>";
                dataHtml += "       <th rowspan='2'>압력 <span class='small'>(㎏/㎠)</span></th>";
                dataHtml += "       <th>흡입압력</th>";
                dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>압력 0.0</a><div class='small gray'>최소압력 0.0</div></td>";
                dataHtml += "   </tr>";
                dataHtml += "   <tr>";
                dataHtml += "       <th class='c-hidden'></th>";
                dataHtml += "       <th>토출압력</th>";
                dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>압력 0.0</a><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>설정 0.0</a><div class='small gray'>최소압력 0.0</div><div class='small gray'>최대압력 0.0</div></td>";
                dataHtml += "   </tr>";

                if (dataAssign == "01" || dataAssign == "02") {
                    dataHtml += "   <tr>";
                    dataHtml += "       <th colspan='2'>수위 <span class='small'>(㎝)</span></th>";
                    dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>수위 000</a></td>";
                    dataHtml += "   </tr>";
                }

                dataHtml += "</tbody>";
            }
        } else {
            //이상이 있을 경우 <tbody>에 'danger' 클래스 추가
            dataHtml += "<tbody>";
            dataHtml += "   <tr>";
            dataHtml += "       <th colspan='2'>가압장명</th>";
            dataHtml += "       <td></td>";
            dataHtml += "   </tr>";
            dataHtml += "   <tr>";
            dataHtml += "       <th rowspan='" + (dataAssign == "05" ? "5" : "3") + "'>가압펌프상태(A)</th>";
            dataHtml += "       <th>1호기</th>";
            dataHtml += "       <td></td>";
            dataHtml += "   </tr>";
            dataHtml += "   <tr>";
            dataHtml += "       <th class='c-hidden'></th>";
            dataHtml += "       <th>2호기</th>";
            dataHtml += "       <td></td>";
            dataHtml += "   </tr>";
            dataHtml += "   <tr>";
            dataHtml += "       <th class='c-hidden'></th>";
            dataHtml += "       <th>3호기</th>";
            dataHtml += "       <td></td>";
            dataHtml += "   </tr>";

            if (dataAssign == "05") {
                dataHtml += "   <tr>";
                dataHtml += "       <th class='c-hidden'></th>";
                dataHtml += "       <th>4호기</th>";
                dataHtml += "       <td></td>";
                dataHtml += "   </tr>";
                dataHtml += "   <tr>";
                dataHtml += "       <th class='c-hidden'></th>";
                dataHtml += "       <th>5호기</th>";
                dataHtml += "       <td></td>";
                dataHtml += "   </tr>";
            }

            dataHtml += "   <tr>";
            dataHtml += "       <th rowspan='2'>배수펌프상태(A)</th>";
            dataHtml += "       <th>1호기</th>";
            dataHtml += "       <td></td>";
            dataHtml += "   </tr>";
            dataHtml += "   <tr>";
            dataHtml += "       <th class='c-hidden'></th>";
            dataHtml += "       <th>2호기</th>";
            dataHtml += "       <td></td>";
            dataHtml += "   </tr>";
            dataHtml += "   <tr>";
            dataHtml += "       <th rowspan='2'>압력 <span class='small'>(㎏/㎠)</span></th>";
            dataHtml += "       <th>흡입압력</th>";
            dataHtml += "       <td></td>";
            dataHtml += "   </tr>";
            dataHtml += "   <tr>";
            dataHtml += "       <th class='c-hidden'></th>";
            dataHtml += "       <th>토출압력</th>";
            dataHtml += "       <td></td>";
            dataHtml += "   </tr>";

            if (dataAssign == "01" || dataAssign == "02") {
                dataHtml += "   <tr>";
                dataHtml += "       <th colspan='2'>수위 <span class='small'>(㎝)</span></th>";
                dataHtml += "       <td></td>";
                dataHtml += "   </tr>";
            }

            dataHtml += "</tbody>";
        }
    } else {
        dataHtml += "<colgroup>";
        dataHtml += "   <col width='*'>";
        dataHtml += "   <col width='*'>";
        dataHtml += "   <col width='*'>";
        dataHtml += "   <col width='*'>";
        dataHtml += "   <col width='*'>";
        dataHtml += "   <col width='*'>";
        dataHtml += "   <col width='*'>";
        dataHtml += "   <col width='*'>";

        if (dataAssign == "01" || dataAssign == "02") {
            dataHtml += "   <col width='*'>";
        } else if (dataAssign == "05") {
            dataHtml += "   <col width='*'>";
            dataHtml += "   <col width='*'>";
        }

        dataHtml += "</colgroup>";
        dataHtml += "<thead>";
        dataHtml += "   <tr>";
        dataHtml += "       <th rowspan='2'>가압장명</th>";
        dataHtml += "       <th colspan='" + (dataAssign == "05" ? "5" : "3") + "'>가압펌프상태(A)</th>";
        dataHtml += "       <th colspan='2'>배수펌프상태(A)</th>";
        dataHtml += "       <th colspan='2'>압력 <span class='small'>(㎏/㎠)</span></th>";

        if (dataAssign == "01" || dataAssign == "02") {
            dataHtml += "       <th rowspan='2'>수위 <span class='small'>(㎝)</span></th>";
        }

        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th class='c-hidden'></th>";
        dataHtml += "       <th>1호기</th>";
        dataHtml += "       <th>2호기</th>";
        dataHtml += "       <th>3호기</th>";

        if (dataAssign == "05") {
            dataHtml += "       <th>4호기</th>";
            dataHtml += "       <th>5호기</th>";
        }

        dataHtml += "       <th>1호기</th>";
        dataHtml += "       <th>2호기</th>";
        dataHtml += "       <th>흡입압력</th>";
        dataHtml += "       <th>토출압력</th>";
        dataHtml += "   </tr>";
        dataHtml += "</thead>";
        dataHtml += "<tbody>";

        for (var i=0; i<selectedArr.length; i++) {
            //이상이 있을 경우 <tr>에 'danger' 클래스 추가
            dataHtml += "   <tr>";
            dataHtml += "       <td>" + selectedArr[i] + "<div class='small green'>통신정상</div></td>";
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>전류 0.0</a><div class='small gray'>RUN</div></td>";
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>전류 0.0</a><div class='small gray'>RUN</div></td>";
            dataHtml += "       <td></td>";

            if (dataAssign == "05") {
                dataHtml += "       <td></td>";
                dataHtml += "       <td></td>";
            }

            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>전류 0.0</a><div class='small gray'>STOP</div></td>";
            dataHtml += "       <td></td>";
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>압력 0.0</a><div class='small gray'>최소압력 0.0</div></td>";
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>압력 0.0</a><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>설정 0.0</a><div class='small gray'>최소압력 0.0</div><div class='small gray'>최대압력 0.0</div></td>";

            if (dataAssign == "01" || dataAssign == "02") {
                dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>수위 000</a></td>";
            }

            dataHtml += "   </tr>";
        }

        dataHtml += "</tbody>";
    }

    //가압장관망감시 수압계 데이터
    for (var i=0; i<selectedArr.length; i++) {
        dataHtml2 += "<tr>";
        dataHtml2 += "   <td>유량계</td>";
        dataHtml2 += "   <td>121111</td>";
        dataHtml2 += "   <td>미추홀구</td>";
        dataHtml2 += "   <td>도화동</td>";
        dataHtml2 += "   <td>123-234</td>";
        dataHtml2 += "   <td>5</td>";
        dataHtml2 += "</tr>";
    }

    $(".search-result-data #v-prefie-data table").html(dataHtml);
    $(".search-result-data #v-prefie-watpre-data table tbody").html(dataHtml2);
    
    if (selectedArr.length > 0) {
        prefieInterval = setInterval(function() {
            clearInterval(prefieInterval);
            getPrefieDataResult(dataAssign,selectedArr);
        }, 60000);
    } else {
        clearInterval(prefieInterval);
    }
}

//배수지관망감시 데이터 가져오기
function getWatresDataResult() {
    var filplaName = $("#filplaName").val(); //정수장명
    var watresName = $("#watresName").val(); //배수지명
    var dataHtml = "";
    var dataHtml2 = "";
    var dataHtml3 = "";
    
    //데이터 가져오기
    //배수지관망감시 데이터    
    dataHtml += "<tr>";
    dataHtml += "    <th>정수장명</th>";
    dataHtml += "    <td colspan='2'>" + filplaName + "</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>배수지명</th>";
    dataHtml += "    <td colspan='2'>" + watresName + "</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>유입압력 <span class='small'>(㎏/㎠)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.0</a></td>";
    dataHtml += "    <td>PT-1002</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>유입유량 <span class='small'>(㎥/h)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000.0</a></td>";
    dataHtml += "    <td>FT-1001</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>유입밸브1 <span class='small'>(%)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml += "    <td>ZT-1003</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>유입밸브2 <span class='small'>(%)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml += "    <td>ZT-1004</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>유입밸브3 <span class='small'>(%)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml += "    <td>ZT-2003</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>유입밸브4 <span class='small'>(%)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml += "    <td>ZT-2004</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>배수지수위1 <span class='small'>(㎝)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml += "    <td>LT-1005</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>배수지수위2 <span class='small'>(㎝)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml += "    <td>LT-1006</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>배수지수위3 <span class='small'>(㎝)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml += "    <td>LT-2005</td>";
    dataHtml += "</tr>";
    dataHtml += "<tr>";
    dataHtml += "    <th>배수지수위4 <span class='small'>(㎝)</span></th>";
    dataHtml += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml += "    <td>LT-2006</td>";
    dataHtml += "</tr>";
    
    if (filplaName == "공촌정수장") {
        dataHtml += "<tr>";
        dataHtml += "    <th>배수지수위5 <span class='small'>(㎝)</span></th>";
        dataHtml += "    <td></td>";
        dataHtml += "    <td></td>";
        dataHtml += "</tr>";
        dataHtml += "<tr>";
        dataHtml += "    <th>배수지수위6 <span class='small'>(㎝)</span></th>";
        dataHtml += "    <td></td>";
        dataHtml += "    <td></td>";
        dataHtml += "</tr>";
        
        dataHtml2 += "<tr>";
        dataHtml2 += "    <th>배수지수위7 <span class='small'>(㎝)</span></th>";
        dataHtml2 += "    <td></td>";
        dataHtml2 += "    <td></td>";
        dataHtml2 += "</tr>";
        dataHtml2 += "<tr>";
        dataHtml2 += "    <th>배수지수위8 <span class='small'>(㎝)</span></th>";
        dataHtml2 += "    <td></td>";
        dataHtml2 += "    <td></td>";
        dataHtml2 += "</tr>";
    }
    
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>유출압력 <span class='small'>(㎏/㎠)</span></th>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>유출유량 <span class='small'>(㎥/h)</span></th>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>유출밸브1 <span class='small'>(%)</span></th>";
    dataHtml2 += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml2 += "    <td>ZT-1008</td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>유출밸브2 <span class='small'>(%)</span></th>";
    dataHtml2 += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml2 += "    <td>ZT-1009</td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>유출밸브3 <span class='small'>(%)</span></th>";
    dataHtml2 += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml2 += "    <td>ZT-2008</td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>유출밸브4 <span class='small'>(%)</span></th>";
    dataHtml2 += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000</a></td>";
    dataHtml2 += "    <td>ZT-2009</td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>탁도 <span class='small'>(NTU)</span></th>";
    dataHtml2 += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.00</a></td>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>잔류염소 <span class='small'>(㎎/ℓ)</span></th>";
    dataHtml2 += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.00</a></td>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>pH</th>";
    dataHtml2 += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.00</a></td>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "</tr>";
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>수온 <span class='small'>(℃)</span></th>";
    dataHtml2 += "    <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.00</a></td>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "</tr>";
    
    if (filplaName == "공촌정수장") {
        dataHtml2 += "<tr>";
        dataHtml2 += "    <th>통신상태</th>";
        dataHtml2 += "    <td><div class='red'>점검요망</div></td>";
        dataHtml2 += "    <td></td>";
        dataHtml2 += "</tr>";
    } else {
        dataHtml2 += "<tr>";
        dataHtml2 += "    <th>통신상태</th>";
        dataHtml2 += "    <td><div class='green'>통신정상</div></td>";
        dataHtml2 += "    <td></td>";
        dataHtml2 += "</tr>";
    }
    
    dataHtml2 += "<tr>";
    dataHtml2 += "    <th>&nbsp;</th>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "    <td></td>";
    dataHtml2 += "</tr>";
    
    //배수지관망감시 유량계 데이터
    for (var i=0; i<3; i++) {
        dataHtml3 += "<tr>";
        dataHtml3 += "   <td>유량계</td>";
        dataHtml3 += "   <td>121111</td>";
        dataHtml3 += "   <td>미추홀구</td>";
        dataHtml3 += "   <td>도화동</td>";
        dataHtml3 += "   <td>123-234</td>";
        dataHtml3 += "   <td>정상</td>";
        dataHtml3 += "   <td>15</td>";
        dataHtml3 += "</tr>";
    }

    $(".watres-default-data #v-watres-data table tbody").html(dataHtml);
    $(".watres-default-data #v-watres-data2 table tbody").html(dataHtml2);
    $(".watres-flux-data #v-watres-flux-data table tbody").html(dataHtml3);
    
    watresInterval = setInterval(function() {
        clearInterval(watresInterval);
        getWatresDataResult();
    }, 60000);
}

//블록수질감시 검색항목 가져오기
function getWatquaBlockData(searchType) {
    var dataAssign = $(".c-search-type select").attr("data-assign");
    var selectedArr = [];
    
    clearInterval(watquaBlockInterval);
    
    if (searchType == "single") {
        var selectedVal = $("#search-result-single select").val();
        
        if (selectedVal != "" && selectedVal != undefined) {
            selectedArr.push(selectedVal);
        }
    } else if (searchType == "multiple") {
        $("#search-result-multiple .search-result-con").removeClass("on");
        
        $("#search-result-multiple .search-multiple-list>li input[type='checkbox']").each(function() {
            if ($(this).is(':checked')) {
                var selectedVal = $(this).val();

                if (selectedVal != "" && selectedVal != undefined) {
                    selectedArr.push(selectedVal);
                }
            }
        });
    }
    
    getWatquaBlockDataResult(dataAssign,selectedArr);
}

//블록수질감시 검색결과 데이터 가져오기
function getWatquaBlockDataResult(dataAssign,selectedArr) {
    var blockNameArr = []; //블록명
    var turbidityArr = []; //탁도 (NTU)
    var phArr = []; //pH
    var reschlArr = []; //잔류염소 (㎎/ℓ)
    var eleconArr = []; //전기전도도 (㎲/㎝)
    var wattemArr = []; //수온 (℃)
    var dataHtml = "";
    
    //데이터 가져오기    
    //블록수질감시 데이터
    for (var i=0; i<selectedArr.length; i++) {
        blockNameArr[i] = selectedArr[i];
        turbidityArr[i] = "0.00";
        phArr[i] = "0.00";
        reschlArr[i] = "0.00";
        eleconArr[i] = "000.0";
        wattemArr[i] = "0.0";
    }
    
    if (selectedArr.length > 0) {
        dataHtml += "<colgroup>";
    
        for (var i=0; i<(selectedArr.length + 1); i++) {
            if (i == 0) {
                dataHtml += "   <col width='1%'>";
            } else {
                dataHtml += "   <col width='*'>";
            }
        }

        dataHtml += "</colgroup>";
        dataHtml += "<thead>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>배수지명</th>";
        
        
        for (var i=0; i<blockNameArr.length; i++) {
            dataHtml += "       <td>" + blockNameArr[i] + "</td>";
        }
        
        dataHtml += "   </tr>";
        dataHtml += "</thead>";
        dataHtml += "<tbody>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>탁도 <span class='small'>(NTU)</span><br><span class='small'>(0.5이하)</span></th>";
        
        for (var i=0; i<turbidityArr.length; i++) {
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>" + turbidityArr[i] + "</a></td>";
        }
        
        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>pH<br><span class='small'>(5.8~8.5)</span></th>";
        
        for (var i=0; i<turbidityArr.length; i++) {
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>" + phArr[i] + "</a></td>";
        }
        
        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>잔류염소 <span class='small'>(㎎/ℓ)</span><br><span class='small'>(0.1~4.0)</span></th>";
        
        for (var i=0; i<turbidityArr.length; i++) {
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>" + reschlArr[i] + "</a></td>";
        }
        
        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>전기전도도 <span class='small'>(㎲/㎝)</span></th>";
        
        for (var i=0; i<turbidityArr.length; i++) {
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>" + eleconArr[i] + "</a></td>";
        }
        
        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>수온 <span class='small'>(℃)</span></th>";
        
        for (var i=0; i<turbidityArr.length; i++) {
            dataHtml += "       <td><a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>" + wattemArr[i] + "</a></td>";
        }
        
        dataHtml += "   </tr>";
        dataHtml += "</tbody>";
    } else {
        dataHtml += "<colgroup>";
        dataHtml += "   <col width='1%'>";
        dataHtml += "   <col width='*'>";
        dataHtml += "</colgroup>";
        dataHtml += "<thead>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>배수지명</th>";
        dataHtml += "       <td></td>";
        dataHtml += "   </tr>";
        dataHtml += "</thead>";
        dataHtml += "<tbody>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>탁도 <span class='small'>(NTU)</span><br><span class='small'>(0.5이하)</span></th>";
        dataHtml += "       <td></td>";
        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>pH<br><span class='small'>(5.8~8.5)</span></th>";
        dataHtml += "       <td></td>";
        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>잔류염소 <span class='small'>(㎎/ℓ)</span><br><span class='small'>(0.1~4.0)</span></th>";
        dataHtml += "       <td></td>";
        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>전기전도도 <span class='small'>(㎲/㎝)</span></th>";
        dataHtml += "       <td></td>";
        dataHtml += "   </tr>";
        dataHtml += "   <tr>";
        dataHtml += "       <th>수온 <span class='small'>(℃)</span></th>";
        dataHtml += "       <td></td>";
        dataHtml += "   </tr>";
        dataHtml += "</tbody>";
    }

    $(".search-result-data #v-watqua-block-data table").html(dataHtml);
    
    if (selectedArr.length > 0) {
        watquaBlockInterval = setInterval(function() {
            clearInterval(watquaBlockInterval);
            getWatquaBlockDataResult(dataAssign,selectedArr);
        }, 60000);
    } else {
        clearInterval(watquaBlockInterval);
    }
}

//관말수질감시 배수지 선택시 선택항목 가져오기
function getWatquaEndData(obj) {
    var selectedArr = [];
    
    clearInterval(watquaEndInterval);
    
    if ($(obj).hasClass("on")) {
        $(obj).removeClass("on");
    } else {
        $(obj).addClass("on");
    }
    
    $("#v-watqua-end-data table thead tr td .c-default-btn").each(function(idx) {
        if ($(this).hasClass("on")) {
            selectedArr[idx] = $(this).attr("data-watres-name");
        } else {
            selectedArr[idx] = "";
        }
    });
    
    getWatquaEndDataResult(selectedArr);
}

//관말수질감시 데이터 가져오기
function getWatquaEndDataResult(selectedArr) {
    var selectedCnt = 0;
    
    for (var i=0; i<selectedArr.length; i++) {
        if (selectedArr[i] != "") {
            //탁도 (NTU)
            $("#v-watqua-end-data table tbody tr").eq(0).children("td").eq(i).html("<a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.00</a>");
            //pH
            $("#v-watqua-end-data table tbody tr").eq(1).children("td").eq(i).html("<a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.00</a>");
            //잔류염소 (㎎/ℓ)
            $("#v-watqua-end-data table tbody tr").eq(2).children("td").eq(i).html("<a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.00</a>");
            //전기전도도 (㎲/㎝)
            $("#v-watqua-end-data table tbody tr").eq(3).children("td").eq(i).html("<a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>000.0</a>");
            //수온 (℃)
            $("#v-watqua-end-data table tbody tr").eq(4).children("td").eq(i).html("<a href='javascript:void(0);' class='c-trand-btn' onclick='openTrendLayer(this);'>0.0</a>");
            
            selectedCnt++;
        } else {
            //탁도 (NTU)
            $("#v-watqua-end-data table tbody tr").eq(0).children("td").eq(i).html("");
            //pH
            $("#v-watqua-end-data table tbody tr").eq(1).children("td").eq(i).html("");
            //잔류염소 (㎎/ℓ)
            $("#v-watqua-end-data table tbody tr").eq(2).children("td").eq(i).html("");
            //전기전도도 (㎲/㎝)
            $("#v-watqua-end-data table tbody tr").eq(3).children("td").eq(i).html("");
            //수온 (℃)
            $("#v-watqua-end-data table tbody tr").eq(4).children("td").eq(i).html("");
        }
    }
    
    if (selectedCnt > 0) {
        watquaEndInterval = setInterval(function() {
            clearInterval(watquaEndInterval);
            getWatquaEndDataResult(selectedArr);
        }, 60000);
    } else {
        clearInterval(watquaEndInterval);
    }
}

//야간최소유량 분석 그리드 그리기
function setNigminGrid() {    
    //그리드 그리기
    $("#nigmin-grid-area").append("<div id='nigminGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //summary 설정
    gridSummary.height = 120;
    gridSummary.position = 'bottom';

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 353;
    } else if (winWidth < 1200) {
        gridBodyHeight = winHeight - 383;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = winHeight - 383;
    } else {
        gridBodyHeight = winHeight - 425;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<30; i++) {
        gridData.push({column00:'2022-03-' + ('0' + (31 - i)).slice(-2),column01:'0,000',column02:'000',column03:'0.00',column04:'000',column05:'00:00',column06:'000',column07:'00:00',column08:'000',column09:'0.00',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'분석일자',name:'column00',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'일 유량(㎥)',name:'column01',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'일 최대유량(㎥/h)',name:'column02',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'평균수압(㎏/㎠)',name:'column03',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'순시값',name:'column04',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'시간',name:'column05',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'이동평균값',name:'column06',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'시간',name:'column07',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'선택값(㎥/h)',name:'column08',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'수압(㎏/㎠)',name:'column09',minWidth: '110',whiteSpace: 'normal'});

    //합쳐진 항목 가져오기
    hdComplexColumns.push({header:'순시야간최소유량(㎥/h)',name:'complexColumn00',childNames:['column04','column05']});
    hdComplexColumns.push({header:'이동평균야간최소유량(㎥/h)',name:'complexColumn01',childNames:['column06','column07']});
    hdComplexColumns.push({header:'야간최소유량',name:'complexColumn02',childNames:['complexColumn00','complexColumn01','column08']});

    gridHeader.height = 'auto';
    gridHeader.complexColumns = hdComplexColumns;

    //summary 가져오기
    smColumnContent.column00 = {template(summary) { return '<ul class="grid-summary-list"><li>최대</li><li>최소</li><li>평균</li></ul>'; }};
    smColumnContent.column01 = {template(summary) { return '<ul class="grid-summary-list"><li>0,000</li><li>0,000</li><li>0,000</li></ul>'; }};
    smColumnContent.column02 = {template(summary) { return '<ul class="grid-summary-list"><li>000</li><li>000</li><li>000</li></ul>'; }};
    smColumnContent.column03 = {template(summary) { return '<ul class="grid-summary-list"><li>0.00</li><li>0.00</li><li>0.00</li></ul>'; }};
    smColumnContent.column04 = {template(summary) { return '<ul class="grid-summary-list"><li>000</li><li>000</li><li>000</li></ul>'; }};
    smColumnContent.column05 = {template(summary) { return '<ul class="grid-summary-list"><li></li><li></li><li></li></ul>'; }};
    smColumnContent.column06 = {template(summary) { return '<ul class="grid-summary-list"><li>000</li><li>000</li><li>000</li></ul>'; }};
    smColumnContent.column07 = {template(summary) { return '<ul class="grid-summary-list"><li></li><li></li><li></li></ul>'; }};
    smColumnContent.column08 = {template(summary) { return '<ul class="grid-summary-list"><li>000</li><li>000</li><li>000</li></ul>'; }};
    smColumnContent.column09 = {template(summary) { return '<ul class="grid-summary-list"><li>0.00</li><li>0.00</li><li>0.00</li></ul>'; }};

    gridSummary.columnContent = smColumnContent;

    nigminGrid = new tui.Grid({
        el: document.getElementById('nigminGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 353;
        } else if (winWidth < 1200) {
            gridReBodyHeight = winHeight - 383;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = winHeight - 383;
        } else {
            gridReBodyHeight = winHeight - 425;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        nigminGrid.setBodyHeight(gridReBodyHeight);
    });
}

//검색조건에 맞춰서 야간최소유량 분석 그리드 다시 그리기
function setNigminGridSearch() {
    $(".c-search-wrap").removeClass("on");
    
    $("#nigminGrid").remove();
    
    setNigminGrid();
}

//유수율 분석 그리드 그리기
function setWatfloGrid() {    
    //그리드 그리기
    $("#watflo-block-grid-area").append("<div id='watfloBlockGrid' class='dynamicGrid'></div>");
    $("#watflo-month-grid-area").append("<div id='watfloMonthGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};
    
    var gridBodyHeight2 = 'auto';
    var gridData2 = [];
    var gridColumns2 = [];
    var gridHeader2 = {};
    var hdComplexColumns2 = [];
    var gridSummary2 = {};
    var smColumnContent2 = {};

    //summary 설정
    gridSummary2.height = 120;
    gridSummary2.position = 'bottom';

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight2 = winHeight - 568;
    } else if (winWidth < 1200) {
        gridBodyHeight2 = winHeight - 601;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight2 = winHeight - 601;
    } else {
        gridBodyHeight2 = winHeight - 643;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight2 = (gridBodyHeight2 < 137) ? 137 : gridBodyHeight2;

    //데이터 가져오기
    gridData.push({column00:'대블록',column01:'00.0',column02:'00.0',column03:'00.0',column04:'00.0',column05:'00.0',column06:'00.0',column07:'00.0',column08:'00.0',column09:'00.0',column10:'00.0',column11:'00.0',column12:'00.0',column13:'00.0',_attributes:{}});
    gridData.push({column00:'중블록',column01:'00.0',column02:'00.0',column03:'00.0',column04:'00.0',column05:'00.0',column06:'00.0',column07:'00.0',column08:'00.0',column09:'00.0',column10:'00.0',column11:'00.0',column12:'00.0',column13:'00.0',_attributes:{}});
    gridData.push({column00:'소블록',column01:'00.0',column02:'00.0',column03:'00.0',column04:'00.0',column05:'00.0',column06:'00.0',column07:'00.0',column08:'00.0',column09:'00.0',column10:'00.0',column11:'00.0',column12:'00.0',column13:'00.0',_attributes:{}});
    
    gridData2.push({column00:'가좌배수지',column01:'수도시설관리소',column02:'00.0',column03:'00.0',column04:'00.0',column05:'00.0',column06:'00.0',column07:'00.0',column08:'00.0',column09:'00.0',column10:'00.0',column11:'00.0',column12:'00.0',column13:'00.0',column14:'00.0',_attributes:{className:{row:['grid-label00']}}});
    
    for (var i=0; i<10; i++) {        
        gridData2.push({column00:(101 + i),column01:'중부수도사업소',column02:'00.0',column03:'00.0',column04:'00.0',column05:'00.0',column06:'00.0',column07:'00.0',column08:'00.0',column09:'00.0',column10:'00.0',column11:'00.0',column12:'00.0',column13:'00.0',column14:'00.0',_attributes:{className:{column:{column07:['grid-red'],column08:['grid-red'],column10:['grid-red']}}}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'블록구분',name:'column00',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'1월',name:'column01',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'2월',name:'column02',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'3월',name:'column03',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'4월',name:'column04',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'5월',name:'column05',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'6월',name:'column06',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'7월',name:'column07',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'8월',name:'column08',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'9월',name:'column09',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'10월',name:'column10',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'11월',name:'column11',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'12월',name:'column12',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'평균',name:'column13',minWidth: '60',whiteSpace: 'normal'});
    
    gridColumns2.push({header:'블록명',name:'column00',minWidth: '120',whiteSpace: 'normal'});
    gridColumns2.push({header:'사업소명',name:'column01',minWidth: '120',whiteSpace: 'normal'});
    gridColumns2.push({header:'1월',name:'column02',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'2월',name:'column03',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'3월',name:'column04',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'4월',name:'column05',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'5월',name:'column06',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'6월',name:'column07',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'7월',name:'column08',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'8월',name:'column09',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'9월',name:'column10',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'10월',name:'column11',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'11월',name:'column12',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'12월',name:'column13',minWidth: '60',whiteSpace: 'normal'});
    gridColumns2.push({header:'평균',name:'column14',minWidth: '60',whiteSpace: 'normal'});

    //summary 가져오기
    smColumnContent2.column00 = {template(summary) { return '<ul class="grid-summary-list"><li>최대</li><li>최소</li><li>평균</li></ul>'; }};
    smColumnContent2.column01 = {template(summary) { return '<ul class="grid-summary-list"><li></li><li></li><li></li></ul>'; }};
    smColumnContent2.column02 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column03 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column04 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column05 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column06 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column07 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column08 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column09 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column10 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column11 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column12 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column13 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent2.column14 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};

    gridSummary2.columnContent = smColumnContent2;

    watfloBlockGrid = new tui.Grid({
        el: document.getElementById('watfloBlockGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    watfloMonthGrid = new tui.Grid({
        el: document.getElementById('watfloMonthGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight2,
        minBodyHeight: 137,
        data: gridData2,
        columns: gridColumns2,
        header: gridHeader2,
        summary: gridSummary2,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight2 = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight2 = winHeight - 568;
        } else if (winWidth < 1200) {
            gridReBodyHeight2 = winHeight - 601;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight2 = winHeight - 601;
        } else {
            gridReBodyHeight2 = winHeight - 643;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight2 = (gridReBodyHeight2 < 137) ? 137 : gridReBodyHeight2;
        
        watfloMonthGrid.setBodyHeight(gridReBodyHeight2);
    });
}

//검색조건에 맞춰서 유수율 분석 그리드 다시 그리기
function setWatfloGridSearch() {
    $(".c-search-wrap").removeClass("on");
    
    $("#watfloBlockGrid").remove();
    $("#watfloMonthGrid").remove();
    
    setWatfloGrid();
}

//총괄수량수지 분석 그리드 그리기
function setTotproGrid() {    
    //그리드 그리기
    $("#totpro-grid-area").append("<div id='totproGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //데이터 가져오기        
    gridData.push({column00:'총급수량',column01:'유효수량',column02:'유수수량',column03:'소계',column04:'0,000',column05:'0,000',column06:'0,000',column07:'0,000',column08:'0,000',column09:'0,000',column10:'0,000',column11:'0,000',column12:'0,000',column13:'0,000',column14:'0,000',column15:'0,000',column16:'0,000',_attributes:{className:{row:['grid-label03']},rowSpan:{column00:16,column01:10,column02:5}}});
    
    gridData.push({column00:'',column01:'',column02:'',column03:'요금수량',column04:'0,000',column05:'0,000',column06:'0,000',column07:'0,000',column08:'0,000',column09:'0,000',column10:'0,000',column11:'0,000',column12:'0,000',column13:'0,000',column14:'0,000',column15:'0,000',column16:'0,000',_attributes:{}});
    gridData.push({column00:'',column01:'',column02:'',column03:'미계량요금수량',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{}});
    gridData.push({column00:'',column01:'',column02:'',column03:'분수량',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{}});
    gridData.push({column00:'',column01:'',column02:'',column03:'기타',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{}});
    
    gridData.push({column00:'',column01:'',column02:'유효무수수량',column03:'소계',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{className:{row:['grid-label03']},rowSpan:{column02:5}}});
    
    gridData.push({column00:'',column01:'',column02:'',column03:'수도사업용수량',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{}});
    gridData.push({column00:'',column01:'',column02:'',column03:'공공수량',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{}});
    gridData.push({column00:'',column01:'',column02:'',column03:'부정사용량',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{}});
    gridData.push({column00:'',column01:'',column02:'',column03:'계량기불감수량',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{}});
    
    gridData.push({column00:'',column01:'무효수량',column02:'무효무수수량',column03:'소계',column04:'0,000',column05:'0,000',column06:'0,000',column07:'0,000',column08:'0,000',column09:'0,000',column10:'0,000',column11:'0,000',column12:'0,000',column13:'0,000',column14:'0,000',column15:'0,000',column16:'0,000',_attributes:{className:{row:['grid-label03']},rowSpan:{column01:3,column02:3}}});
    
    gridData.push({column00:'',column01:'',column02:'',column03:'조정감액수량',column04:'0',column05:'0',column06:'0',column07:'0',column08:'0',column09:'0',column10:'0',column11:'0',column12:'0',column13:'0',column14:'0',column15:'0',column16:'0',_attributes:{}});
    gridData.push({column00:'',column01:'',column02:'',column03:'누수량',column04:'0,000',column05:'0,000',column06:'0,000',column07:'0,000',column08:'0,000',column09:'0,000',column10:'0,000',column11:'0,000',column12:'0,000',column13:'0,000',column14:'0,000',column15:'0,000',column16:'0,000',_attributes:{}});
    
    gridData.push({column00:'',column01:'총계',column02:'',column03:'소계',column04:'0,000',column05:'0,000',column06:'0,000',column07:'0,000',column08:'0,000',column09:'0,000',column10:'0,000',column11:'0,000',column12:'0,000',column13:'0,000',column14:'0,000',column15:'0,000',column16:'0,000',_attributes:{className:{row:['grid-label03']},rowSpan:{column01:2,column02:2}}});
    
    gridData.push({column00:'',column01:'',column02:'',column03:'생산량',column04:'0,000',column05:'0,000',column06:'0,000',column07:'0,000',column08:'0,000',column09:'0,000',column10:'0,000',column11:'0,000',column12:'0,000',column13:'0,000',column14:'0,000',column15:'0,000',column16:'0,000',_attributes:{}});
    
    gridData.push({column00:'',column01:'유수율(%)',column02:'',column03:'',column04:'00.0',column05:'00.0',column06:'00.0',column07:'00.0',column08:'00.0',column09:'00.0',column10:'00.0',column11:'00.0',column12:'00.0',column13:'00.0',column14:'00.0',column15:'00.0',column16:'00.0',_attributes:{className:{column:{column01:['grid-label03'],column02:['grid-label03'],column03:['grid-label03']}}}});

    //전체 항목 가져오기
    gridColumns.push({header:'-',name:'column00',minWidth: '70',whiteSpace: 'normal'});
    gridColumns.push({header:'-',name:'column01',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'-',name:'column02',minWidth: '90',whiteSpace: 'normal'});
    gridColumns.push({header:'-',name:'column03',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'1월',name:'column04',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'2월',name:'column05',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'3월',name:'column06',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'4월',name:'column07',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'5월',name:'column08',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'6월',name:'column09',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'7월',name:'column10',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'8월',name:'column11',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'9월',name:'column12',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'10월',name:'column13',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'11월',name:'column14',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'12월',name:'column15',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'총계',name:'column16',minWidth: '60',whiteSpace: 'normal'});

    //합쳐진 항목 가져오기
    hdComplexColumns.push({header:'구분',name:'complexColumn00',childNames:['column00','column01','column02','column03']});

    gridHeader.height = 'auto';
    gridHeader.complexColumns = hdComplexColumns;

    totproGrid = new tui.Grid({
        el: document.getElementById('totproGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
}

//검색조건에 맞춰서 총괄수량수지 분석 그리드 다시 그리기
function setTotproGridSearch() {
    $(".c-search-wrap").removeClass("on");
    
    $("#totproGrid").remove();
    
    setTotproGrid();
}

//누수량 분석 그리드 그리기
function setAmoleaGrid() {    
    //그리드 그리기
    $("#amolea-grid-area").append("<div id='amoleaGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //summary 설정
    gridSummary.height = 120;
    gridSummary.position = 'bottom';

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 328;
    } else if (winWidth < 1200) {
        gridBodyHeight = winHeight - 356;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = winHeight - 356;
    } else {
        gridBodyHeight = winHeight - 398;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<30; i++) {
        gridData.push({column00:'2022-03-' + ('0' + (31 - i)).slice(-2),column01:'0,000',column02:'0.0',column03:'000.0',column04:'0.0',column05:'0.0',column06:'0.0',column07:'000.0',column08:'00.0',column09:'000.0',column10:'00.00',column11:'0,000.0',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'분석일자',name:'column00',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'일 유량(㎥)',name:'column01',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'평균수압(㎏/㎠)',name:'column02',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'야간최소유량(㎥/h)',name:'column03',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'가정사용량',name:'column04',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'비정기사용량',name:'column05',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'합계',name:'column06',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'야간배경누수량',name:'column07',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'야간파열누수량',name:'column08',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'합계',name:'column09',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'야간-일 보정계수(NDF)',name:'column10',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'추정누수량(㎥)',name:'column11',minWidth: '120',whiteSpace: 'normal'});

    //합쳐진 항목 가져오기
    hdComplexColumns.push({header:'야간사용량(㎥/h)',name:'complexColumn00',childNames:['column04','column05','column06']});
    hdComplexColumns.push({header:'야간누수량(㎥/h)',name:'complexColumn01',childNames:['column07','column08','column09']});

    gridHeader.height = 'auto';
    gridHeader.complexColumns = hdComplexColumns;

    //summary 가져오기
    smColumnContent.column00 = {template(summary) { return '<ul class="grid-summary-list"><li>최대</li><li>최소</li><li>평균</li></ul>'; }};
    smColumnContent.column01 = {template(summary) { return '<ul class="grid-summary-list"><li>0,000</li><li>0,000</li><li>0,000</li></ul>'; }};
    smColumnContent.column02 = {template(summary) { return '<ul class="grid-summary-list"><li>0.0</li><li>0.0</li><li>0.0</li></ul>'; }};
    smColumnContent.column03 = {template(summary) { return '<ul class="grid-summary-list"><li>000.0</li><li>000.0</li><li>000.0</li></ul>'; }};
    smColumnContent.column04 = {template(summary) { return '<ul class="grid-summary-list"><li>0.0</li><li>0.0</li><li>0.0</li></ul>'; }};
    smColumnContent.column05 = {template(summary) { return '<ul class="grid-summary-list"><li>0.0</li><li>0.0</li><li>0.0</li></ul>'; }};
    smColumnContent.column06 = {template(summary) { return '<ul class="grid-summary-list"><li>0.0</li><li>0.0</li><li>0.0</li></ul>'; }};
    smColumnContent.column07 = {template(summary) { return '<ul class="grid-summary-list"><li>000.0</li><li>000.0</li><li>000.0</li></ul>'; }};
    smColumnContent.column08 = {template(summary) { return '<ul class="grid-summary-list"><li>00.0</li><li>00.0</li><li>00.0</li></ul>'; }};
    smColumnContent.column09 = {template(summary) { return '<ul class="grid-summary-list"><li>000.0</li><li>000.0</li><li>000.0</li></ul>'; }};
    smColumnContent.column10 = {template(summary) { return '<ul class="grid-summary-list"><li>00.00</li><li>00.00</li><li>00.00</li></ul>'; }};
    smColumnContent.column11 = {template(summary) { return '<ul class="grid-summary-list"><li>0,000.0</li><li>0,000.0</li><li>0,000.0</li></ul>'; }};

    gridSummary.columnContent = smColumnContent;

    amoleaGrid = new tui.Grid({
        el: document.getElementById('amoleaGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 328;
        } else if (winWidth < 1200) {
            gridReBodyHeight = winHeight - 356;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = winHeight - 356;
        } else {
            gridReBodyHeight = winHeight - 398;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        amoleaGrid.setBodyHeight(gridReBodyHeight);
    });
}

//검색조건에 맞춰서 누수량 분석 그리드 다시 그리기
function setAmoleaGridSearch() {
    $(".c-search-wrap").removeClass("on");
    
    $("#amoleaGrid").remove();
    
    setAmoleaGrid();
}

//수압 분석 그리드 그리기
function setWatpreGrid() {    
    //그리드 그리기
    $("#watpre-flux-grid-area").append("<div id='watpreFluxGrid' class='dynamicGrid'></div>");
    $("#watpre-pressure-grid-area").append("<div id='watprePressureGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};
    
    var gridBodyHeight2 = 'auto';
    var gridData2 = [];
    var gridColumns2 = [];
    var gridHeader2 = {};
    var hdComplexColumns2 = [];
    var gridSummary2 = {};
    var smColumnContent2 = {};

    //데이터 가져오기
    gridData.push({column00:'101',column01:'유량(㎥)',column02:'000',column03:'000',column04:'000',column05:'000',column06:'000',column07:'000',column08:'000',_attributes:{rowSpan:{column00:3}}});
    gridData.push({column00:'',column01:'수압(㎏/㎠)',column02:'0.0',column03:'0.0',column04:'0.0',column05:'0.0',column06:'0.0',column07:'0.0',column08:'0.0',_attributes:{}});
    gridData.push({column00:'',column01:'표고(El.m)',column02:'00.00',column03:'00.00',column04:'00.00',column05:'00.00',column06:'00.00',column07:'00.00',column08:'00.00',_attributes:{}});
    
    gridData2.push({column00:'101',column01:'수압1',column02:'수압(㎏/㎠)',column03:'0.0',column04:'0.0',column05:'0.0',column06:'0.0',column07:'0.0',column08:'0.0',column09:'0.0',_attributes:{rowSpan:{column00:6,column01:2}}});
    gridData2.push({column00:'',column01:'',column02:'표고(El.m)',column03:'00.00',column04:'00.00',column05:'00.00',column06:'00.00',column07:'00.00',column08:'00.00',column09:'00.00',_attributes:{}});
    gridData2.push({column00:'',column01:'수압2',column02:'수압(㎏/㎠)',column03:'0.0',column04:'0.0',column05:'0.0',column06:'0.0',column07:'0.0',column08:'0.0',column09:'0.0',_attributes:{rowSpan:{column01:2}}});
    gridData2.push({column00:'',column01:'',column02:'표고(El.m)',column03:'00.00',column04:'00.00',column05:'00.00',column06:'00.00',column07:'00.00',column08:'00.00',column09:'00.00',_attributes:{}});
    gridData2.push({column00:'',column01:'수압3',column02:'수압(㎏/㎠)',column03:'0.0',column04:'0.0',column05:'0.0',column06:'0.0',column07:'0.0',column08:'0.0',column09:'0.0',_attributes:{rowSpan:{column01:2}}});
    gridData2.push({column00:'',column01:'',column02:'표고(El.m)',column03:'00.00',column04:'00.00',column05:'00.00',column06:'00.00',column07:'00.00',column08:'00.00',column09:'00.00',_attributes:{}});

    //전체 항목 가져오기
    gridColumns.push({header:'블록명',name:'column00',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'항목명',name:'column01',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'2022-03-02',name:'column02',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'2022-03-03',name:'column03',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'2022-03-04',name:'column04',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'2022-03-05',name:'column05',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'2022-03-06',name:'column06',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'2022-03-07',name:'column07',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'2022-03-08',name:'column08',minWidth: '80',whiteSpace: 'normal'});
    
    gridColumns2.push({header:'블록명',name:'column00',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'지점',name:'column01',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'항목명',name:'column02',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'2022-03-02',name:'column03',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'2022-03-03',name:'column04',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'2022-03-04',name:'column05',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'2022-03-05',name:'column06',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'2022-03-06',name:'column07',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'2022-03-07',name:'column08',minWidth: '80',whiteSpace: 'normal'});
    gridColumns2.push({header:'2022-03-08',name:'column09',minWidth: '80',whiteSpace: 'normal'});

    watpreFluxGrid = new tui.Grid({
        el: document.getElementById('watpreFluxGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    watprePressureGrid = new tui.Grid({
        el: document.getElementById('watprePressureGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight2,
        minBodyHeight: 137,
        data: gridData2,
        columns: gridColumns2,
        header: gridHeader2,
        summary: gridSummary2,
        showDummyRows: true
    });
}

//검색조건에 맞춰서 수압 분석 그리드 다시 그리기
function setWatpreGridSearch() {
    $(".c-search-wrap").removeClass("on");
    
    $("#watpreFluxGrid").remove();
    $("#watprePressureGrid").remove();
    
    setWatpreGrid();
}

//계측기 현황의 지점 목록 그리드 그리기
function setMeainsPointGrid() {    
    //그리드 그리기
    $("#meains-point-grid-area").append("<div id='meainsPointGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};
    
    //그리드 header 높이 설정
    gridHeader.height = 62;
    
    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 220;
    } else if (winWidth < 766) {
        gridBodyHeight = winHeight - 244;
    } else if (winWidth < 1200) {
        gridBodyHeight = (winHeight / 2) - 194;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = (winHeight / 2) - 194;
    } else {
        gridBodyHeight = (winHeight / 2) - 215;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 137) ? 137 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<10; i++) {
        gridData.push({column00:(101 + i),column01:'302A' + (0101 + i),column02:'수위+수질+유량/수압',column03:'소블록 기본지점',column04:'일반',column05:'20210901',column06:'인천시',column07:'',column08:'',column09:'',column10:'',column11:'',column12:'',column13:'',column14:'',column15:'',column16:'',column17:'',column18:'',column19:'',column20:'',column21:'',column22:'',_attributes:{className:{row:['grid-pointer']}}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'블록명',name:'column00',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'지점코드',name:'column01',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'지점구분',name:'column02',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'지점구분2',name:'column03',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'지점구분3',name:'column04',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'측정개시일(설치일)',name:'column05',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'지점위치',name:'column06',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'배수지총면적(㎥)',name:'column07',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 펌프스펙',name:'column08',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 펌프수',name:'column09',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 수혜가구',name:'column10',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 수혜인원',name:'column11',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 급수구역(블록)',name:'column12',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 저부하시간계수',name:'column13',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 중부하시간계수',name:'column14',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 고부하시간계수',name:'column15',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 수압제어전CP수압',name:'column16',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 CP수압',name:'column17',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 초기누수량',name:'column18',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 수용가사용량',name:'column19',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 누수지수',name:'column20',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 제어간격',name:'column21',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'가압장 소속배수지',name:'column22',minWidth: '110',whiteSpace: 'normal'});

    meainsPointGrid = new tui.Grid({
        el: document.getElementById('meainsPointGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 220;
        } else if (winWidth < 766) {
            gridReBodyHeight = winHeight - 244;  
        } else if (winWidth < 1200) {
            gridReBodyHeight = (winHeight / 2) - 194;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = (winHeight / 2) - 194;
        } else {
            gridReBodyHeight = (winHeight / 2) - 215;
        }
        //20221111 수정부분 end

        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 137) ? 137 : gridReBodyHeight;
        
        meainsPointGrid.setBodyHeight(gridReBodyHeight);
    });
    
    //지점 목록의 항목 클릭시 계측기 현황의 계측기 목록 그리드 다시 그리기
    meainsPointGrid.on("click", function(event) {
        if (event.rowKey != undefined) {
            var gridSelected = $("#meains-point-grid-area .tui-grid-body-area").attr("grid-selected");

            if (gridSelected == undefined) {
                gridSelected = "";
            }

            if (gridSelected != "") {
                meainsPointGrid.removeRowClassName(gridSelected,"grid-label00");
            }
            
            meainsPointGrid.addRowClassName(event.rowKey,"grid-label00");
            
            $("#meains-point-grid-area .tui-grid-body-area").attr("grid-selected",event.rowKey);
            
            if ($("#meains-machine-grid-area").length > 0) {
                $("#meainsMachineGrid").remove();

                setMeainsMachineGrid();
                
                showContentDivide('2');
            }
        }
    });
}

//검색조건에 맞춰서 계측기 현황의 지점 목록 그리드 다시 그리기
function setMeainsPointGridSearch() {
    $(".c-search-wrap").removeClass("on");
    
    $("#meainsMachineGrid").remove();
    $("#meainsPointGrid").remove();
    
    setMeainsPointGrid();
    
    showContentDivide('1');
}

//계측기 현황의 계측기 목록 그리드 그리기
function setMeainsMachineGrid() {    
    //그리드 그리기
    $("#meains-machine-grid-area").append("<div id='meainsMachineGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};
    
    //그리드 header 높이 설정
    gridHeader.height = 62;
    
    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 220;
    } else if (winWidth < 766) {
        gridBodyHeight = winHeight - 244;   
    } else if (winWidth < 1200) {
        gridBodyHeight = (winHeight / 2) - 194;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = (winHeight / 2) - 194;
    } else {
        gridBodyHeight = (winHeight / 2) - 215;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 137) ? 137 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<10; i++) {
        gridData.push({column00:'300001',column01:'302A0101',column02:'348블록 유입유량계',column03:i,column04:'유량계',column05:'기본계측기',column06:'',column07:'',column08:'소블록 유입유량',column09:'',column10:'',column11:'',column12:'',column13:'',column14:'',column15:'',column16:'',column17:'',column18:'',column19:'',column20:'',_attributes:{className:{row:['grid-pointer']}}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'계측기 아이디',name:'column00',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'계측기 지점코드',name:'column01',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'계측기명',name:'column02',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'계측기 시리얼번호',name:'column03',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'계측기 종류1',name:'column04',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'계측기 종류2',name:'column05',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'계측기 모델아이디',name:'column06',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'설치일시',name:'column07',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'비고',name:'column08',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'GIS계측기 아이디',name:'column09',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'최종수정자',name:'column10',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'최종수정일',name:'column11',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'관리번호(기물번호)',name:'column12',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'ODMA번호',name:'column13',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'제작회사',name:'column14',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'설치(교체)일',name:'column15',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'군구명',name:'column16',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'세부주소',name:'column17',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'표고',name:'column18',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'구경',name:'column19',minWidth: '80',whiteSpace: 'normal'});
    gridColumns.push({header:'유형',name:'column20',minWidth: '80',whiteSpace: 'normal'});

    meainsMachineGrid = new tui.Grid({
        el: document.getElementById('meainsMachineGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 220;
        } else if (winWidth < 766) {
            gridReBodyHeight = winHeight - 244;
        } else if (winWidth < 1200) {
            gridReBodyHeight = (winHeight / 2) - 194;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = (winHeight / 2) - 194;
        } else {
            gridReBodyHeight = (winHeight / 2) - 215;
        }
        //20221111 수정부분 end

        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 137) ? 137 : gridReBodyHeight;
        
        meainsMachineGrid.setBodyHeight(gridReBodyHeight);
    });
    
    //계측기 목록의 항목 클릭시 TAG정보관리창 열기
    meainsMachineGrid.on("click", function(event) {
        if (event.rowKey != undefined) {      
            var gridSelected = $("#meains-machine-grid-area .tui-grid-body-area").attr("grid-selected");

            if (gridSelected == undefined) {
                gridSelected = "";
            }

            if (gridSelected != "") {
                meainsMachineGrid.removeRowClassName(gridSelected,"grid-label00");
            }
            
            meainsMachineGrid.addRowClassName(event.rowKey,"grid-label00");
            
            $("#meains-machine-grid-area .tui-grid-body-area").attr("grid-selected",event.rowKey);
            
            openInfoTagLayer();
        }
    });
}

//20220720 수정부분 start
//편집데이터 관리에서 사용자 편집이력 그리드 그리기
function setEdidatUserGrid() {    
    //그리드 그리기
    $("#edidat-user-grid-area").append("<div id='edidatUserGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 223;
    } else if (winWidth < 1200) {
        gridBodyHeight = winHeight - 250;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = winHeight - 250;
    } else {
        gridBodyHeight = winHeight - 292;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<30; i++) {
        gridData.push({column00:'woosc87',column01:'01234567',column02:'2020-12-01',column03:'수도시설관리소',column04:'sys1',column05:'',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'아이디',name:'column00',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'관리번호',name:'column01',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'편집시간',name:'column02',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'관리기관',name:'column03',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'시스템코드',name:'column04',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'편집내용',name:'column05',minWidth: '110',whiteSpace: 'normal'});

    edidatUserGrid = new tui.Grid({
        el: document.getElementById('edidatUserGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 223;
        } else if (winWidth < 1200) {
            gridReBodyHeight = winHeight - 250;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = winHeight - 250;
        } else {
            gridReBodyHeight = winHeight - 292;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        edidatUserGrid.setBodyHeight(gridReBodyHeight);
    });
}

//편집데이터 관리에서 시설물 편집이력 그리드 그리기
function setEdidatFacilityGrid() {    
    //그리드 그리기
    $("#edidat-facility-grid-area").append("<div id='edidatFacilityGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 223;
    } else if (winWidth < 1200) {
        gridBodyHeight = winHeight - 250;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = winHeight - 250;
    } else {
        gridBodyHeight = winHeight - 292;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<30; i++) {
        gridData.push({column00:'누수지점',column01:'01234567',column02:'2020-12-01',column03:'수도시설관리소',column04:'sys1',column05:'',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'관리번호',name:'column01',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'편집시간',name:'column02',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'관리기관',name:'column03',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'시스템코드',name:'column04',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'편집내용',name:'column05',minWidth: '110',whiteSpace: 'normal'});

    edidatFacilityGrid = new tui.Grid({
        el: document.getElementById('edidatFacilityGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 223;
        } else if (winWidth < 1200) {
            gridReBodyHeight = winHeight - 250;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = winHeight - 250;
        } else {
            gridReBodyHeight = winHeight - 292;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        edidatFacilityGrid.setBodyHeight(gridReBodyHeight);
    });
}

//사업소편집데이터 관리에서 사용자 편집이력 그리드 그리기
function setBueddaUserGrid() {    
    //그리드 그리기
    $("#buedda-user-grid-area").append("<div id='bueddaUserGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 223;
    } else if (winWidth < 1200) {
        gridBodyHeight = winHeight - 250;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = winHeight - 250;
    } else {
        gridBodyHeight = winHeight - 292;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<30; i++) {
        gridData.push({column00:'woosc87',column01:'누수지점',column02:'01234567',column03:'2020-12-01',column04:'수도시설관리소',column05:'sys01',column06:'0',column07:'',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'아이디',name:'column00',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'지형지물부호',name:'column01',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'관리번호',name:'column02',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'편집시간',name:'column03',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'관리기관',name:'column04',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'시스템코드',name:'column05',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'RECOVERY_AT',name:'column06',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'편집내용',name:'column07',minWidth: '110',whiteSpace: 'normal'});

    bueddaUserGrid = new tui.Grid({
        el: document.getElementById('bueddaUserGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 223;
        } else if (winWidth < 1200) {
            gridReBodyHeight = winHeight - 250;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = winHeight - 250;
        } else {
            gridReBodyHeight = winHeight - 292;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        bueddaUserGrid.setBodyHeight(gridReBodyHeight);
    });
}

//사업소편집데이터 관리에서 시설물 편집이력 그리드 그리기
function setBueddaFacilityGrid() {    
    //그리드 그리기
    $("#buedda-facility-grid-area").append("<div id='bueddaFacilityGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 223;
    } else if (winWidth < 1200) {
        gridBodyHeight = winHeight - 250;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = winHeight - 250;
    } else {
        gridBodyHeight = winHeight - 292;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<30; i++) {
        gridData.push({column00:'누수지점',column01:'01234567',column02:'2020-12-01',column03:'수도시설관리소',column04:'sys01',column05:'0',column06:'',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'관리번호',name:'column01',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'편집시간',name:'column02',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'관리기관',name:'column03',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'시스템코드',name:'column04',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'RECOVERY_AT',name:'column05',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'편집내용',name:'column06',minWidth: '110',whiteSpace: 'normal'});

    bueddaFacilityGrid = new tui.Grid({
        el: document.getElementById('bueddaFacilityGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 223;
        } else if (winWidth < 1200) {
            gridReBodyHeight = winHeight - 250;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = winHeight - 250;
        } else {
            gridReBodyHeight = winHeight - 292;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        bueddaFacilityGrid.setBodyHeight(gridReBodyHeight);
    });
}

//데이터백업 관리 그리드 그리기
function setDatbacGrid() {    
    //그리드 그리기
    $("#datbac-grid-area").append("<div id='datbacGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 223;
    } else if (winWidth < 1200) {
        gridBodyHeight = winHeight - 250;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = winHeight - 250;
    } else {
        gridBodyHeight = winHeight - 292;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<30; i++) {
        gridData.push({column00:'20200101',column01:'2020-01-01',column02:'경기백업',column03:'5',column04:'',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'폴더명',name:'column00',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'백업일시',name:'column01',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'백업코드',name:'column02',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'HDD식별번호',name:'column03',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'백업내용',name:'column04',minWidth: '110',whiteSpace: 'normal'});

    datbacGrid = new tui.Grid({
        el: document.getElementById('datbacGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 223;
        } else if (winWidth < 1200) {
            gridReBodyHeight = winHeight - 250;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = winHeight - 250;
        } else {
            gridReBodyHeight = winHeight - 292;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        datbacGrid.setBodyHeight(gridReBodyHeight);
    });
}

//지도출력데이터 관리 그리드 그리기
function setMapdatGrid() {    
    //그리드 그리기
    $("#mapdat-grid-area").append("<div id='mapdatGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    //20221111 수정부분 start
    if (winWidth < 576) {
        gridBodyHeight = winHeight - 223;
    } else if (winWidth < 1200) {
        gridBodyHeight = winHeight - 250;
    } else if ($(".m-wrap").hasClass("android-wrap")) {
        gridBodyHeight = winHeight - 250;
    } else {
        gridBodyHeight = winHeight - 292;
    }
    //20221111 수정부분 end
    
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<30; i++) {
        gridData.push({column00:'woosc87',column01:'지도출력',column02:'상수관망 확인',column03:'2020-12-10',column04:'167013.71',column05:'541861.19',column06:'167267.71',column07:'541978.79',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'아이디',name:'column00',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'출력명',name:'column01',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'출력사유',name:'column02',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'출력시간',name:'column03',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'X_MIN',name:'column04',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'X_MAX',name:'column05',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'Y_MIN',name:'column06',minWidth: '110',whiteSpace: 'normal'});
    gridColumns.push({header:'Y_MAX',name:'column07',minWidth: '110',whiteSpace: 'normal'});

    mapdatGrid = new tui.Grid({
        el: document.getElementById('mapdatGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        //20221111 수정부분 start
        if (winWidth < 576) {
            gridReBodyHeight = winHeight - 223;
        } else if (winWidth < 1200) {
            gridReBodyHeight = winHeight - 250;
        } else if ($(".m-wrap").hasClass("android-wrap")) {
            gridReBodyHeight = winHeight - 250;
        } else {
            gridReBodyHeight = winHeight - 292;
        }
        //20221111 수정부분 end
        
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        mapdatGrid.setBodyHeight(gridReBodyHeight);
    });
}
//20220720 수정부분 end

//20220926 수정부분 start
//수계전환 그리드 그리기
function setDisdiaGrid() {
    //그리드 그리기
    $("#disdia-grid-area").append("<div id='disdiaGrid' class='dynamicGrid'></div>");
    
    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};
    
    //그리드 body 높이 설정
    gridBodyHeight = 217;
    
    //데이터 가져오기
    for (var i=0; i<10; i++) {
        gridData.push({column00:(i + 1),column01:'2022-09-26 00:00',column02:'2022-09-26 00:00',_attributes:{className:{row:['grid-pointer']}}});
    }
    
    //전체 항목 가져오기
    gridColumns.push({header:'번호',name:'column00',minWidth: '60',whiteSpace: 'normal'});
    gridColumns.push({header:'시작일',name:'column01',minWidth: '120',whiteSpace: 'normal'});
    gridColumns.push({header:'종료일',name:'column02',minWidth: '120',whiteSpace: 'normal'});
    
    disdiaGrid = new tui.Grid({
        el: document.getElementById('disdiaGrid'),
        scrollX: true,
        scrollY: true,
        rowHeaders: ['checkbox'],
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        gridReBodyHeight = 217;
        
        disdiaGrid.setBodyHeight(gridReBodyHeight);
    });
    
    //수계전환 항목 체크시
    disdiaGrid.on("check",function(event) {
        var gridSelected = $("#disdia-grid-area .tui-grid-body-area").attr("grid-selected");
        
        if (gridSelected == undefined) {
            gridSelected = "";
        }
        
        if (gridSelected != "") {
            disdiaGrid.uncheck(gridSelected);
            
            disdiaGrid.removeRowClassName(gridSelected,"grid-label00");
        }
        
        disdiaGrid.addRowClassName(event.rowKey,"grid-label00");
        
        $("#disdia-grid-area .tui-grid-body-area").attr("grid-selected",event.rowKey);
    });
    
    //수계전환 항목 체크해제시
    disdiaGrid.on("uncheck",function(event) {
        disdiaGrid.removeRowClassName(event.rowKey,"grid-label00");
        
        $("#disdia-grid-area .tui-grid-body-area").attr("grid-selected","");
    });
    
    //수계전환 항목 클릭시
    disdiaGrid.on("click",function(event) {
        if (event.rowKey != undefined && event.columnName != "_checked") {
            var gridCheckedArr = disdiaGrid.getCheckedRowKeys();
            
            if (gridCheckedArr.indexOf(event.rowKey) > -1) {
                disdiaGrid.uncheck(event.rowKey);
            } else {
                disdiaGrid.check(event.rowKey);
            }
        }
    });
}

//검색조건에 맞춰서 수계전환 그리드 다시 그리기
function setDisdiaGridSearch() {
    $(".c-search-wrap").removeClass("on");
    
    $("#disdiaGrid").remove();
    
    setDisdiaGrid();
}
//20220926 수정부분 end

//20220928 수정부분 start
function openCanvasPrint(canvasUrl) {
    var printWindow = window.open('', '_blank', 'width=1080,height=764');
    
    printWindow.document.write('<html><head><title></title>');
    printWindow.document.write('</head><body>');
    
    //20221101 수정부분 start
    printWindow.document.write('<img src="' + canvasUrl + '" style="max-width: 100%;">');
    //20221101 수정부분 end
    
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus(); 
    
    setTimeout(function() {
        printWindow.print();
        printWindow.close();
    }, 400);
}
//20220928 수정부분 end

//트렌드분석 데이터 가져오기
function getTrandData(type,obj) {
    var dataHtml = "";
    
    //데이터 가져오기
    dataHtml += "<tr>";
    dataHtml += "   <td>AISSKB003_HFTI_1001A</td>";
    dataHtml += "   <td>원적산 유입유량순시</td>";
    dataHtml += "   <td>2000.00</td>";
    dataHtml += "   <td>5000.00</td>";
    dataHtml += "   <td>0000.00</td>";
    dataHtml += "   <td>㎥/h</td>";
    dataHtml += "</tr>";
    
    $("#trand-layer #v-trand-data table tbody").html(dataHtml);
    
    getTrandChartData("loop",obj);
    
    if ($("#trand-layer.on").length > 0 || type == "start") {
        trandInterval = setInterval(function() {
            clearInterval(trandInterval);
            getTrandData("loop",obj);
        }, 60000);
    } else {
        clearInterval(trandInterval);
    }
}

//트렌드분석 차트 데이터 가져오기
function getTrandChartData(type,obj) {
    trandData = [];
    
    //데이터 가져오기
    var nowDate = new Date();

    nowDate.setDate(nowDate.getDate() - 3);

    var startTime = nowDate.getTime();

    for (var i=0; i<4320; ++i) {
        var random = ((Math.random() * 10000) / 100).toFixed(1);

        trandData.push({x:startTime + (i * 60000), y:random});
    }
    
    //차트가 있을 경우에만 데이터 업데이트
    if (trandChart != undefined) {
        var oldTrandData = trandChart.data.datasets[0].data;
        var newTrandData = trandData;

        for (var i=0; i<oldTrandData.length; i++) {
            oldTrandData[i] = newTrandData[i];
        }
        
        trandChart.update();
    }
}

//트렌드분석 차트 리사이즈시 시간축 개수 설정
function setTrandChartResize() {
    if (trandChart != undefined) {
        if (winWidth < 576) {
            trandChart.options.scales.x.ticks.maxTicksLimit = 2;
        } else if (winWidth < 768) {
            trandChart.options.scales.x.ticks.maxTicksLimit = 4;
        } else if (winWidth < 992) {
            trandChart.options.scales.x.ticks.maxTicksLimit = 6;
        } else {
            trandChart.options.scales.x.ticks.maxTicksLimit = 10;
        }
        
        trandChart.update();
    }
}

//그리드 엑셀 다운로드
function getDynamicGridExcel(gridId) {
    if ($("#" + gridId).length > 0) {
        if (gridId == "abnmonEventGrid" && abnmonEventGrid != undefined) {
            abnmonEventGrid.export('xlsx');
        } else if (gridId == "nigminGrid" && nigminGrid != undefined) {
            nigminGrid.export('xlsx');
        } else if (gridId == "watfloMonthGrid" && watfloMonthGrid != undefined) {
            watfloMonthGrid.export('xlsx');
        } else if (gridId == "totproGrid" && totproGrid != undefined) {
            totproGrid.export('xlsx');
        } else if (gridId == "amoleaGrid" && amoleaGrid != undefined) {
            amoleaGrid.export('xlsx');
        } else if (gridId == "watpreFluxGrid" && watpreFluxGrid != undefined) {
            watpreFluxGrid.export('xlsx');
        } else if (gridId == "watprePressureGrid" && watprePressureGrid != undefined) {
            watprePressureGrid.export('xlsx');
        } else if (gridId == "meainsPointGrid" && meainsPointGrid != undefined) {
            meainsPointGrid.export('xlsx');
        } else if (gridId == "meainsMachineGrid" && meainsMachineGrid != undefined) {
            meainsMachineGrid.export('xlsx');
        } else if (gridId == "meainsNewtagGrid" && meainsNewtagGrid != undefined) {
            meainsNewtagGrid.export('xlsx');
        } else if (gridId == "meainsInfotagGrid" && meainsInfotagGrid != undefined) {
            meainsInfotagGrid.export('xlsx');
        } else if (gridId == "mapLedgerGrid" && mapLedgerGrid != undefined) {
            mapLedgerGrid.export('xlsx');
        } else if (gridId == "mapLedger2Grid" && mapLedger2Grid != undefined) {
            mapLedger2Grid.export('xlsx');
        } else if (gridId == "mapInfoGrid" && mapInfoGrid != undefined) {
            mapInfoGrid.export('xlsx');
        } else if (gridId == "mapWatercutGrid" && mapWatercutGrid != undefined) {
            mapWatercutGrid.export('xlsx');
            
        //20220719 수정부분 start
        } else if (gridId == "mapWatersupplyGrid" && mapWatersupplyGrid != undefined) {
            mapWatersupplyGrid.export('xlsx');
        //20220719 수정부분 end
        
        //20220720 수정부분 start
        } else if (gridId == "edidatUserGrid" && edidatUserGrid != undefined) {
            edidatUserGrid.export('xlsx');
        } else if (gridId == "edidatFacilityGrid" && edidatFacilityGrid != undefined) {
            edidatFacilityGrid.export('xlsx');
        } else if (gridId == "bueddaUserGrid" && bueddaUserGrid != undefined) {
            bueddaUserGrid.export('xlsx');
        } else if (gridId == "bueddaFacilityGrid" && bueddaFacilityGrid != undefined) {
            bueddaFacilityGrid.export('xlsx');
        } else if (gridId == "datbacGrid" && datbacGrid != undefined) {
            datbacGrid.export('xlsx');
        } else if (gridId == "mapdatGrid" && mapdatGrid != undefined) {
            mapdatGrid.export('xlsx');
        //20220720 수정부분 end
            
        //20220926 수정부분 start
        } else if (gridId == "disdiaGrid" && disdiaGrid != undefined) {
            disdiaGrid.export("xlsx");
        //20220926 수정부분 end
        }
    }
}

//20220714 수정부분 start
//그리드 CSV 다운로드
function getDynamicGridCsv(gridId) {
    if ($("#" + gridId).length > 0) {
        if (gridId == "mapLedgerGrid" && mapLedgerGrid != undefined) {
            mapLedgerGrid.export('csv');
        } else if (gridId == "mapInfoGrid" && mapInfoGrid != undefined) {
            mapInfoGrid.export('csv');
        }
    }
}
//20220714 수정부분 end

//레이어 팝업 열기
function openLayer(type,msg,fun) {
    $("#" + type + "-layer .layer-box .layer-con-area .layer-con").html(msg);
    
    $("#" + type + "-layer .layer-box .layer-btn-area .confirm-btn").removeAttr("onclick");
    $("#" + type + "-layer .layer-box .layer-btn-area .confirm-btn").attr("onclick","closeLayer(this);" + fun);
    
    $("#" + type + "-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//헤더 내정보창 열기
function openUserModifyLayer(obj) {
    $("#user-modify-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//메인 서브메뉴창 열기
function openSubMenuLayer(obj) {
    var menuImgHtml = $(obj).children(".menu-list-img").html();
    var menuTxtHtml = $(obj).children(".menu-list-txt").html();
    var subMenuHtml = $(obj).children(".sub-menu-list").html();
    
    $("#sub-menu-layer .layer-box .layer-tit-area .layer-tit-img").html(menuImgHtml);
    $("#sub-menu-layer .layer-box .layer-tit-area .layer-tit-txt").html(menuTxtHtml);
    $("#sub-menu-layer .layer-box .layer-con-area .sub-menu-list").html(subMenuHtml);
    
    $("#sub-menu-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//사용자관리 사용자추가창 열기
function openUserAddLayer(obj) {
    $("#user-add-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//사용자관리 사용자상세정보창 열기
function openUserDetailLayer(obj) {
    $("#user-detail-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//권한정보 권한그룹추가창 열기
function openAuthAddLayer(obj) {
    $("#auth-add-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//로그인로그조회 아이디상세로그창 열기
function openLoginLogLayer(obj) {
    $("#login-log-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//20221028 수정부분 start
//문자전송 수신자추가창 열기
function openMessageReceiverAddLayer(obj) {
    $("#message-receiver-add-layer").addClass("on");
    
	//전체 체크&체크해제
    $("input[type='checkbox'][id$='All']").click(function() {
        var idName = $(this).attr("id").slice(0,-3);
        
        if (idName != "" && idName != undefined) {
            if ($(this).is(":checked")) {
                $("input[type='checkbox'][id^='" + idName + "']").prop("checked",true);
            } else {
                $("input[type='checkbox'][id^='" + idName + "']").prop("checked",false);
            }
        }
    });
	
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20221028 수정부분 end

//20220714 수정부분 start
//관망도관리 레이어 등록정보창 열기
function openMapLayerinfoLayer(obj) {
    $("#map-layerinfo-layer").addClass("on");
    
    //20220715 수정부분 start
    //심볼 선그리기
    if ($("#map-layerinfo-layer .map-layerinfo-symbol").length > 0) {
        var symbolWeight = $("#map-layerinfo-layer .map-layerinfo-symbol").attr("data-symbol-weight");
        var symbolColor = $("#map-layerinfo-layer .map-layerinfo-symbol").attr("data-symbol-color");
        var symbolStyle = $("#map-layerinfo-layer .map-layerinfo-symbol").attr("data-symbol-style");
        
        $("#map-layerinfo-layer .map-layerinfo-symbol").css("border-top-width",symbolWeight + "px");
        $("#map-layerinfo-layer .map-layerinfo-symbol").css("border-top-color",symbolColor);
        $("#map-layerinfo-layer .map-layerinfo-symbol").css("border-top-style",symbolStyle);
    }
    //20220715 수정부분 end
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20220714 수정부분 end

//20220715 수정부분 start
//관망도관리 레이어 심볼선택창 열기
function openMapLayersymbolLayer() {
    $("#map-layersymbol-layer").addClass("on");
    
    //심볼 선그리기
    if ($("#map-layerinfo-layer .map-layerinfo-symbol").length > 0 && $("#map-layersymbol-layer .map-layerinfo-symbol").length > 0) {
        var symbolWeight = $("#map-layerinfo-layer .map-layerinfo-symbol").attr("data-symbol-weight");
        var symbolColor = $("#map-layerinfo-layer .map-layerinfo-symbol").attr("data-symbol-color");
        var symbolStyle = $("#map-layerinfo-layer .map-layerinfo-symbol").attr("data-symbol-style");
        
        $("#map-layersymbol-layer .map-layerinfo-symbol").css("border-top-width",symbolWeight + "px");
        $("#map-layersymbol-layer .map-layerinfo-symbol").css("border-top-color",symbolColor);
        $("#map-layersymbol-layer .map-layerinfo-symbol").css("border-top-style",symbolStyle);
    }
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20220715 수정부분 end

//20220720 수정부분 start
//SQL식 작성기창 열기
function openSqlSearchLayer(obj) {
    $("#sql-search-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//20220720 수정부분 end

//20220926 수정부분 start
//수계전환 추가창 열기
function openDisdiaAddLayer(obj) {
    $("#disdia-add-layer").find(".c-search-wrap").removeClass("on");
    
    $("#disdia-add-layer").addClass("on");
    
    //datepicker 설정
    $(".c-date-input").each(function() {
        $(this).datepicker();
    });
    
    var scrollTop = parseInt($(document).scrollTop());
    
    $("body").css("top", -scrollTop + "px");
    
    $("body").addClass("scroll-disable").on("scroll touchmove", function (event) {
        event.preventDefault();
    });
}
//20220926 수정부분 end

//계측기현황 신규TAG목록창 열기
function openNewTagLayer() {
    //그리드 그리기
    $("#meains-newtag-grid-area").append("<div id='meainsNewtagGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //데이터 가져오기
    for (var i=0; i<3; i++) {
        gridData.push({column00:'AIJBSS001_JFTI_J348',column01:'기술된 태그명 없음',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'태그아이디',name:'column00',minWidth: '',whiteSpace: 'normal'});
    gridColumns.push({header:'태그명',name:'column01',minWidth: '',whiteSpace: 'normal'});

    meainsNewtagGrid = new tui.Grid({
        el: document.getElementById('meainsNewtagGrid'),
        scrollX: false,
        scrollY: false,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 120,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    $("#new-tag-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//계측기현황 TAG정보관리창 열기
function openInfoTagLayer() {
    //그리드 그리기
    $("#meains-infotag-grid-area").append("<div id='meainsInfotagGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    gridBodyHeight = (winWidth < 576) ? (winHeight - 160) : (winHeight - 185);
    //그리드 body 최소높이 설정
    gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;

    //데이터 가져오기
    for (var i=0; i<3; i++) {
        gridData.push({column00:'AIJBSS001_JFTI_J348',column01:'300001',column02:'순시유량',column03:'348블록 순간유량',column04:'순시유량',column05:'㎥/hr',column06:'999,999,999',column07:'0',column08:'0',column09:'',column10:'2021-11-09',_attributes:{}});
    }

    //전체 항목 가져오기
    gridColumns.push({header:'태그아이디',name:'column00',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'계측기아이디',name:'column01',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'데이터종류',name:'column02',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'태그명',name:'column03',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'태그명2',name:'column04',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'원천데이터단위',name:'column05',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'정상상한값',name:'column06',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'정상하한값',name:'column07',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'비고',name:'column08',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'최종수정자',name:'column09',minWidth: '100',whiteSpace: 'normal'});
    gridColumns.push({header:'최종수정일',name:'column10',minWidth: '100',whiteSpace: 'normal'});

    meainsInfotagGrid = new tui.Grid({
        el: document.getElementById('meainsInfotagGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true
    });
    
    $("#info-tag-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        //그리드 body 높이 설정
        gridReBodyHeight = (winWidth < 576) ? (winHeight - 160) : (winHeight - 185);
        //그리드 body 최소높이 설정
        gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        
        meainsInfotagGrid.setBodyHeight(gridReBodyHeight);
    });
}

//이상감시 이벤트분석창 열기
function openAbnmonEvent(obj) {
    var dataDivide = $(obj).attr("data-divide");
    var dataKind = $(obj).attr("data-kind");
    var labelHtml = "";
    
    $("#v-divide").html(dataDivide);
    
    //그리드 그리기
    if ($("#abnmon-event-grid-area").length > 0) {
        $("#abnmon-event-grid-area").append("<div id='abnmonEventGrid' class='dynamicGrid'></div>");
        
        var gridBodyHeight = 'auto';
        var gridData = [];
        var gridColumns = [];
        var gridHeader = {};
        var hdComplexColumns = [];
        var gridSummary = {};
        var smColumnContent = {};
        
        //summary 설정
        gridSummary.height = 40;
        gridSummary.position = 'bottom';
        
        if (dataDivide.indexOf("정수장") > -1) {
            //정수장일 경우
            //그리드 body 높이 설정
            gridBodyHeight = (winWidth < 576) ? (winHeight - 235) : (winHeight - 266);
            //그리드 body 최소높이 설정
            gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;
            
            //데이터 가져오기
            for (var i=0; i<10; i++) {
                gridData.push({column00:'부평정수장',column01:'부평1정수지',column02:'00,000',column03:'0.0',column04:'-',column05:'000,000',column06:'0.0',column07:'-',column08:'0.0',column09:'0.0',column10:'-',column11:'0.0',column12:'0.0',column13:'0',_attributes:{}});
                gridData.push({column00:'부평정수장',column01:'부평2정수지',column02:'00,000',column03:'0.0',column04:'-',column05:'000,000',column06:'0.0',column07:'-',column08:'0.0',column09:'0.0',column10:'-',column11:'0.0',column12:'0.0',column13:'0',_attributes:{}});
                gridData.push({column00:'부평정수장',column01:'부평3정수지',column02:'00,000',column03:'0.0',column04:'-',column05:'000,000',column06:'0.0',column07:'-',column08:'0.0',column09:'0.0',column10:'-',column11:'0.0',column12:'0.0',column13:'0',_attributes:{}});
            }
            
            //전체 항목 가져오기
            gridColumns.push({header:'정수장명',name:'column00',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'세부명칭',name:'column01',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일적산유량(㎥)',name:'column02',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column03',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column04',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일적산유량(㎥)',name:'column05',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column06',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column07',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일평균수압(㎏/㎠)',name:'column08',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column09',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column10',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일평균수압(㎏/㎠)',name:'column11',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column12',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column13',minWidth: '120',whiteSpace: 'normal'});
            
            //합쳐진 항목 가져오기
            hdComplexColumns.push({header:'유입',name:'complexColumn00',childNames:['column02','column03','column04']});
            hdComplexColumns.push({header:'유출',name:'complexColumn01',childNames:['column05','column06','column07']});
            hdComplexColumns.push({header:'유출',name:'complexColumn02',childNames:['column08','column09','column10']});
            hdComplexColumns.push({header:'유출',name:'complexColumn03',childNames:['column11','column12','column13']});
            hdComplexColumns.push({header:'유량',name:'complexColumn04',childNames:['complexColumn00','complexColumn01']});
            hdComplexColumns.push({header:'수압',name:'complexColumn05',childNames:['complexColumn02','complexColumn03']});
            
            gridHeader.height = 'auto';
            gridHeader.complexColumns = hdComplexColumns;
            
            //summary 가져오기
            smColumnContent.column00 = {template(summary) { return '합계(건수)'; }};
            smColumnContent.column04 = {template(summary) { return '-건'; }};
            smColumnContent.column07 = {template(summary) { return '-건'; }};
            smColumnContent.column10 = {template(summary) { return '-건'; }};
            smColumnContent.column13 = {template(summary) { return '-건'; }};
            
            gridSummary.columnContent = smColumnContent;
        } else if (dataDivide == "수도시설관리소") {
            //수도시설관리소일 경우
            //그리드 body 높이 설정
            gridBodyHeight = (winWidth < 576) ? (winHeight - 235) : (winHeight - 266);
            //그리드 body 최소높이 설정
            gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;
            
            //데이터 가져오기
            for (var i=0; i<10; i++) {
                gridData.push({column00:'가좌배수지',column01:'00,000',column02:'0.0',column03:'0',column04:'000,000',column05:'0.0',column06:'0',column07:'0.0',column08:'0.0',column09:'0',column10:'0.0',column11:'0.0',column12:'0',_attributes:{}});
                gridData.push({column00:'강화배수지',column01:'00,000',column02:'0.0',column03:'0',column04:'000,000',column05:'0.0',column06:'0',column07:'0.0',column08:'0.0',column09:'0',column10:'0.0',column11:'0.0',column12:'0',_attributes:{}});
                gridData.push({column00:'강화산단배수지',column01:'00,000',column02:'0.0',column03:'0',column04:'000,000',column05:'0.0',column06:'0',column07:'0.0',column08:'0.0',column09:'0',column10:'0.0',column11:'0.0',column12:'0',_attributes:{}});
            }
            
            //전체 항목 가져오기
            gridColumns.push({header:'배수지명',name:'column00',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일적산유량(㎥)',name:'column01',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column02',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column03',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일적산유량(㎥)',name:'column04',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column05',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column06',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일평균수압(㎏/㎠)',name:'column07',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column08',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column09',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일평균수압(㎏/㎠)',name:'column10',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column11',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column12',minWidth: '120',whiteSpace: 'normal'});
            
            //합쳐진 항목 가져오기
            hdComplexColumns.push({header:'유입',name:'complexColumn00',childNames:['column01','column02','column03']});
            hdComplexColumns.push({header:'유출',name:'complexColumn01',childNames:['column04','column05','column06']});
            hdComplexColumns.push({header:'유입',name:'complexColumn02',childNames:['column07','column08','column09']});
            hdComplexColumns.push({header:'유출',name:'complexColumn03',childNames:['column10','column11','column12']});
            hdComplexColumns.push({header:'유량',name:'complexColumn04',childNames:['complexColumn00','complexColumn01']});
            hdComplexColumns.push({header:'수압',name:'complexColumn05',childNames:['complexColumn02','complexColumn03']});
            
            gridHeader.height = 'auto';
            gridHeader.complexColumns = hdComplexColumns;
            
            //summary 가져오기
            smColumnContent.column00 = {template(summary) { return '합계(건수)'; }};
            smColumnContent.column03 = {template(summary) { return '0건'; }};
            smColumnContent.column06 = {template(summary) { return '0건'; }};
            smColumnContent.column09 = {template(summary) { return '0건'; }};
            smColumnContent.column12 = {template(summary) { return '0건'; }};
            
            gridSummary.columnContent = smColumnContent;
        } else if (dataDivide.indexOf("사업소") > -1) {
            //수도사업소일 경우
            //그리드 body 높이 설정
            gridBodyHeight = (winWidth < 576) ? (winHeight - 210) : (winHeight - 239);
            //그리드 body 최소높이 설정
            gridBodyHeight = (gridBodyHeight < 217) ? 217 : gridBodyHeight;
            
            //데이터 가져오기
            for (var i=0; i<10; i++) {                
                gridData.push({column00:'가좌배수지',column01:'00,000',column02:'0.0',column03:'0',column04:'0.0',column05:'0.0',column06:'0',column07:'순시',column08:'00',column09:'0.0',column10:'00,000,000',column11:'000.0',column12:'초과',_attributes:{className:{column:{column08:['grid-label00'],column09:['grid-label01'],column10:['grid-label02'],column11:['grid-label02'],column12:['grid-label03']}}}});
                gridData.push({column00:'강화배수지',column01:'00,000',column02:'0.0',column03:'0',column04:'0.0',column05:'0.0',column06:'0',column07:'순시',column08:'00',column09:'0.0',column10:'00,000,000',column11:'000.0',column12:'초과',_attributes:{className:{column:{column08:['grid-label00'],column09:['grid-label01'],column10:['grid-label02'],column11:['grid-label02'],column12:['grid-label03']}}}});
                gridData.push({column00:'강화산단배수지',column01:'00,000',column02:'0.0',column03:'0',column04:'0.0',column05:'0.0',column06:'0',column07:'순시',column08:'00',column09:'0.0',column10:'00,000,000',column11:'000.0',column12:'초과',_attributes:{className:{column:{column08:['grid-label00'],column09:['grid-label01'],column10:['grid-label02'],column11:['grid-label02'],column12:['grid-label03']}}}});
            }
            
            //전체 항목 가져오기
            gridColumns.push({header:'블록명',name:'column00',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일적산유량(㎥)',name:'column01',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column02',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column03',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'일평균수압(㎏/㎠)',name:'column04',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column05',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'이상유무건수',name:'column06',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'산정값',name:'column07',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'야간최소유량(㎥/h)',name:'column08',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'전일대비증감(%)',name:'column09',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'허용값',name:'column10',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'허용값대비증감(%)',name:'column11',minWidth: '120',whiteSpace: 'normal'});
            gridColumns.push({header:'3일연속초과',name:'column12',minWidth: '120',whiteSpace: 'normal'});
            
            //합쳐진 항목 가져오기
            hdComplexColumns.push({header:'유량',name:'complexColumn00',childNames:['column01','column02','column03']});
            hdComplexColumns.push({header:'수압',name:'complexColumn01',childNames:['column04','column05','column06']});
            hdComplexColumns.push({header:'야간최소유량',name:'complexColumn02',childNames:['column07','column08','column09','column10','column11','column12']});
            
            gridHeader.height = 'auto';
            gridHeader.complexColumns = hdComplexColumns;
            
            //summary 가져오기
            smColumnContent.column00 = {template(summary) { return '합계(건수)'; }};
            smColumnContent.column03 = {template(summary) { return '0건'; }};
            smColumnContent.column06 = {template(summary) { return '0건'; }};
            smColumnContent.column08 = {template(summary) { return '0건'; }};
            smColumnContent.column09 = {template(summary) { return '0건'; }};
            smColumnContent.column11 = {template(summary) { return '0건'; }};
            smColumnContent.column12 = {template(summary) { return '0건'; }};
            
            gridSummary.columnContent = smColumnContent;
            
            //그리드 라벨 html
            labelHtml += "<ul class='abnmon-event-label-list'>";
            labelHtml += "    <li class='grid-label00'>야간최소유량 0값 건수</li>";
            labelHtml += "    <li class='grid-label01'>전일대비 50% 증가 건수</li>";
            labelHtml += "    <li class='grid-label02'>허용값 초과 건수</li>";
            labelHtml += "    <li class='grid-label03'>3일연속 초과 건수</li>";
            labelHtml += "</ul>";
        }
        
        abnmonEventGrid = new tui.Grid({
            el: document.getElementById('abnmonEventGrid'),
            scrollX: true,
            scrollY: true,
            rowHeight: 'auto',
            bodyHeight: gridBodyHeight,
            minBodyHeight: 137,
            data: gridData,
            columns: gridColumns,
            header: gridHeader,
            summary: gridSummary,
            showDummyRows: true
        });
    }
    
    $("#abnmon-event-layer .abnmon-event-label-area").html(labelHtml);
    
    $("#abnmon-event-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
    
    //리사이즈시
    $(window).resize(function() {
        var gridReBodyHeight = 'auto';
        
        if (dataDivide.indexOf("정수장") > -1) {
            //그리드 body 높이 설정
            gridReBodyHeight = (winWidth < 576) ? (winHeight - 235) : (winHeight - 266);
            //그리드 body 최소높이 설정
            gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        } else if (dataDivide == "수도시설관리소") {
            //그리드 body 높이 설정
            gridReBodyHeight = (winWidth < 576) ? (winHeight - 235) : (winHeight - 266);
            //그리드 body 최소높이 설정
            gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        } else if (dataDivide.indexOf("사업소") > -1) {
            //그리드 body 높이 설정
            gridReBodyHeight = (winWidth < 576) ? (winHeight - 210) : (winHeight - 239);
            //그리드 body 최소높이 설정
            gridReBodyHeight = (gridReBodyHeight < 217) ? 217 : gridReBodyHeight;
        }
        
        abnmonEventGrid.setBodyHeight(gridReBodyHeight);
    });
}

//트렌드 분석화면창 열기 (차트 데이터 가져오기 > 차트 그리기 > 일반 데이터 가져오기 > 차트 데이터 업데이트 > 레이어 열기)
function openTrendLayer(obj) {    
    //차트 그리기
    if ($(".trand-chart-area").length > 0) {
        $(".trand-chart-area").append("<canvas id='trandChart' width='100' height='60'></canvas>");
        
        getTrandChartData("start",obj);
        
        trandCtx = document.getElementById('trandChart').getContext('2d');
        trandChart = new Chart(trandCtx, {
            type: 'line',
            data: {
                datasets: [{
                    type: 'line',
                    data: trandData,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    radius: 0,
                    pointBorderWidth: 0,
                    hoverBorderWidth: 0
                }]
            },
            options: {
                animation: false,
                parsing: false,
                showLines: false,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    decimation: {
                        enabled: true,
                        algorithm: 'lttb',
                        samples: 4320
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        ticks: {
                            maxTicksLimit: 10, //3일전 ~ 현재를 8시간 단위로 표시 (줄바꿈 적용하고 싶은데 어떻게 해야할지 모르겠음)
                            maxRotation: 0,
                            color: "#15204a"
                        },
                        time: {
                            parser: 'HH:mm:ss',
                            unit: 'hour',
                            displayFormats: {
                                hour: 'yyyy/MM/dd HH:mm'
                            },
                            tooltipFormat: 'yyyy/MM/dd HH:mm'
                        },
                        grid: {
                            display: true,
                            color: "rgba(21,32,74,0.2)"
                        }
                    },
                    y: {
                        min: -50,
                        max: 150,
                        beginAtZero: true,
                        ticks: {
                            color: "#2879ec"
                        },
                        grid: {
                            display: true,
                            color: "rgba(40,121,236,0.2)"
                        }
                    }
                }
            }
        });
    }
    
    setTrandChartResize();
    
    getTrandData("start",obj);
    
    $("#trand-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//레이어 팝업 닫기
function closeLayer(obj) {
    $(obj).closest(".layer-wrap").removeClass("on");
    
    if ($(".layer-wrap.on").length == 0 && $("nav.nav.on").length == 0) {
        $("body").removeClass("scroll-disable").off('scroll touchmove');

        var scrollTop = Math.abs(parseInt($("body").css("top")));

        $("html,body").animate({scrollTop: scrollTop}, 0);
    }
}

//계측기현황 신규TAG목록창 닫기
function closeNewTagLayer(obj) {
    $("#meainsNewtagGrid").remove();
    
    closeLayer(obj);
}

//계측기현황 TAG정보관리창 닫기
function closeInfoTagLayer(obj) {
    $("#meainsInfotagGrid").remove();
    
    closeLayer(obj);
}

//이상감시 이벤트분석창 닫기
function closeAbnmonEvent(obj) {
    $("#abnmonEventGrid").remove();
    
    closeLayer(obj);
}

//트렌드 분석화면창 닫기 (반복 중지 > 차트 제거 > 레이어 닫기)
function closeTrandLayer(obj) {
    clearInterval(trandInterval);
    
    $("#trandChart").remove();
    
    closeLayer(obj);
}

//헤더 전체메뉴창 닫기
function closeNavMenu(obj) {
    $("nav.nav").removeClass("on");
    
    if ($(".layer-wrap.on").length == 0 && $("nav.nav.on").length == 0) {
        $("body").removeClass("scroll-disable").off('scroll touchmove');

        var scrollTop = Math.abs(parseInt($("body").css("top")));

        $("html,body").animate({scrollTop: scrollTop}, 0);
    }
}

//관망도조회 검색 셀렉트박스 옵션 보이기&숨기기
function showMapSearchSelect(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    if ($(mapLayerObj).find(".map-search-select-list").hasClass("on")) {
        $(mapLayerObj).find(".map-search-select-list").removeClass("on");
    } else {
        $(mapLayerObj).find(".map-search-input-list").removeClass("on");
        $(mapLayerObj).find(".map-search-select-list").addClass("on");
    }
}

//관망도조회 검색 셀렉트박스 옵션 선택
function selMapSearchSelect(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var selSelectTxt = $(obj).next("label").text();
    
    //20220926 수정부분 start
    if ($(obj).val() == "지번주소") {
        $(mapLayerObj).find(".map-search-box").find(".map-search-input").css("display", "none");
        $(mapLayerObj).find(".map-search-box").find(".map-search-btn").css("display", "none");
        $(mapLayerObj).find(".map-search-building-form").removeClass("on");
        $(mapLayerObj).find(".map-search-address-form").addClass("on");
    } else if ($(obj).val() == "건물명주소") {
        $(mapLayerObj).find(".map-search-box").find(".map-search-input").css("display", "none");
        $(mapLayerObj).find(".map-search-box").find(".map-search-btn").css("display", "none");
        $(mapLayerObj).find(".map-search-address-form").removeClass("on");
        $(mapLayerObj).find(".map-search-building-form").addClass("on");
    } else {
        $(mapLayerObj).find(".map-search-box").find(".map-search-input").css("display", "");
        $(mapLayerObj).find(".map-search-box").find(".map-search-btn").css("display", "");
        $(mapLayerObj).find(".map-search-address-form").removeClass("on");
        $(mapLayerObj).find(".map-search-building-form").removeClass("on");
    }
    //20220926 수정부분 end
    
    $(mapLayerObj).find(".map-search-select").text(selSelectTxt);
    $(mapLayerObj).find(".map-search-select-list").removeClass("on");
}

//관망도조회 검색 텍스트박스 옵션 보이기&숨기기
function showMapSearchInput(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    $(mapLayerObj).find(".map-search-select-list").removeClass("on");
    
    if ($(obj).val() != "") {
        $(mapLayerObj).find(".map-search-input-list").addClass("on");
    } else {
        $(mapLayerObj).find(".map-search-input-list").removeClass("on");
    }
}

//관망도조회 검색 텍스트박스 옵션 선택
function selMapSearchInput(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var selInputTxt = $(obj).next("label").text();
    
    $(mapLayerObj).find(".map-search-input").val(selInputTxt);
    $(mapLayerObj).find(".map-search-input-list").removeClass("on");
}

//20220926 수정부분 start
//관망도조회 검색 지번주소 검색 해제
function setMapAddressClear(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    $(mapLayerObj).find(".map-search-address-form").find(".address-form-item1").find("select").find("option").eq(0).prop("selected", true);
    selMapAddress($(mapLayerObj).find(".map-search-address-form").find(".address-form-item1").find("select").find("option").eq(0), "address1");
}

//관망도조회 검색 지번주소 옵션 선택 (type : address1 (등록구 선택시), address2 (읍/면/동 선택시))
function selMapAddress(obj, type) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var addressVal = $(obj).val();
    var addressHtml = "";
    var addressHtml2 = "";
    
    //초기화
    $(mapLayerObj).find(".map-search-address-form").find("input[type='text']").val("");
    $(mapLayerObj).find(".map-search-address-form").find("input[type='checkbox']").prop("checked", false);
    
    if (type == "address1") {
        $(mapLayerObj).find(".map-search-address-form").find(".address-form-item3").removeClass("on");
        
        addressHtml += "<option value=''>선택</option>";
        addressHtml2 += "<option value=''>선택</option>";
        
        if (addressVal != "") {
            addressHtml += "<option value='강화읍'>강화읍</option>";
            addressHtml += "<option value='교동면'>교동면</option>";
            addressHtml += "<option value='길상면'>길상면</option>";
            addressHtml += "<option value='내가면'>내가면</option>";
            addressHtml += "<option value='불은면'>불은면</option>";
            addressHtml += "<option value='삼산면'>삼산면</option>";
            addressHtml += "<option value='서도면'>서도면</option>";
            addressHtml += "<option value='선원면'>선원면</option>";
            addressHtml += "<option value='송해면'>송해면</option>";
            addressHtml += "<option value='양도면'>양도면</option>";
            addressHtml += "<option value='양사면'>양사면</option>";
            addressHtml += "<option value='하점면'>하점면</option>";
            addressHtml += "<option value='화도면'>화도면</option>";
            
            //값이 강화군, 옹진군일 경우에만 산 항목 노출
            if (addressVal == "강화군" || addressVal == "옹진군") {
                $(mapLayerObj).find(".map-search-address-form").find(".address-form-item3").addClass("on");
            }
        }
        
        //읍/면/동 항목 셀렉트박스에 옵션 설정
        $(mapLayerObj).find(".map-search-address-form").find(".address-form-item2").find("select").html(addressHtml);
        
        //산 항목 셀렉트박스에 옵션 설정
        $(mapLayerObj).find(".map-search-address-form").find(".address-form-item3").find("select").html(addressHtml2);
    } else if (type == "address2") {
        addressHtml2 += "<option value=''>선택</option>";
        
        if (addressVal != "") {
            addressHtml2 += "<option value='갑곶리'>갑곶리</option>";
            addressHtml2 += "<option value='관청리'>관청리</option>";
            addressHtml2 += "<option value='국화리'>국화리</option>";
            addressHtml2 += "<option value='남산리'>남산리</option>";
            addressHtml2 += "<option value='대산리'>대산리</option>";
            addressHtml2 += "<option value='신문리'>신문리</option>";
            addressHtml2 += "<option value='옥림리'>옥림리</option>";
            addressHtml2 += "<option value='용정리'>용정리</option>";
            addressHtml2 += "<option value='월곳리'>월곳리</option>";
        }
        
        //산 항목 셀렉트박스에 옵션 설정
        $(mapLayerObj).find(".map-search-address-form").find(".address-form-item3").find("select").html(addressHtml2);
    }
}

//관망도조회 검색 건물명주소 검색 해제
function setMapBuildingClear(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    $(mapLayerObj).find(".map-search-building-form").find(".building-form-item1").find("select").find("option").eq(0).prop("selected", true);
    $(mapLayerObj).find(".map-search-building-form").find("input[type='text']").val("");
}

//20221101 수정부분 start
//관망도조회 화면캡쳐 영역 설정
function setMapScreenshot(obj) {
    //캡쳐 기능 활성화
    /*var height = window.innerHeight;
    var width = $(document).width();
    var $mask = $('<div id="screenshot_mask"></div>').css("border-width", "0 0 " + height + "px 0");
    var $focus = $('<div id="screenshot_focus"></div>');
    
    //dimmed 추가
    $("body").append($mask);
    
    //마우스 커서에 따라 캡쳐 영역을 만들 div
    $("body").append($focus);
    
    var selectArea = false;
    
    $("body").one("mousedown", function(e) {
        //캡쳐 영역 선택 시작
        e.preventDefault();
        
        selectArea = true;
        startX = e.clientX;
        startY = e.clientY;
    }).one("mouseup", function(e) {
        //캡쳐 시작
        selectArea = false;
        
        $("body").off("mousemove", mousemove);
        
        //이벤트 삭제
        $("#screenshot_focus").remove();
        
        //마우스 포커스 삭제
        $("#screenshot_mask").remove();
        
        //딤 삭제
        var x = e.clientX;
        var y = e.clientY;
        var top = Math.min(y, startY);
        var left = Math.min(x, startX);
        var width = Math.max(x, startX) - left;
        var height = Math.max(y, startY) - top;
        
        html2canvas(document.body).then(function(canvas) {
            //전체 화면 캡쳐
            var img = canvas.getContext("2d").getImageData(left, top, width, height);
            
            //선택 영역만큼 crop
            var c = document.createElement("canvas");
            
            c.width = width;
            c.height = height;
            c.getContext("2d").putImageData(img, 0, 0);
            
            //crop한 이미지 저장
            //save(c);
            openMapLayer(obj, "screenshot");
            document.querySelector("#map-screenshot").appendChild(c);
            
            if ($("#map-screenshot canvas").length > 0) {
                var screenshotAreaHeight = $("#map-screenshot").height();
                var screenshotCanvasHeight = $("#map-screenshot").find("canvas").height();
                
                if (screenshotAreaHeight > screenshotCanvasHeight) {
                    $("#map-screenshot").addClass("not-over");
                } else {
                    $("#map-screenshot").removeClass("not-over");
                }
            }
            
            //20220928 수정부분 start
            var mapLayerObj = $("#map-screenshot").closest(".map-layer-wrap");
            
            $(mapLayerObj).find(".print-btn").click(function() {
                openCanvasPrint(c.toDataURL("image/jpeg"));
            });
            //20220928 수정부분 end
        });
    }).on("mousemove", mousemove);
    
    //캡쳐 영역 크기 변경
    function mousemove(e) {
        var x = e.clientX;
        var y = e.clientY;
        
        //마우스 커서 따라 좌표 포커스 이동
        $focus.css("left", x);
        $focus.css("top", y);
        
        if (selectArea) {
            //캡쳐 영역 선택 그림
            var top = Math.min(y, startY);
            var right = width - Math.max(x, startX);
            var bottom = height - Math.max(y, startY);
            var left = Math.min(x, startX);
            
            $mask.css("border-width", [top + "px", right + "px", bottom + "px", left + "px"].join(" "));
        }
    }
    
    function save(canvas) {
        //파일로 저장
        if (navigator.msSaveBlob) {
            var blob = canvas.msToBlob();
            
            return navigator.msSaveBlob(blob, "파일명.jpg");
        } else {
            var el = document.getElementById("target");
            
            el.href = canvas.toDataURL("image/jpeg");
            el.download = "파일명.jpg";
            el.click();
        }
    }*/
    
    $(".preloader").addClass("on");
    
    //지도 영역 태그와 그 밑에 있는 자식태그 모두 제외한 나머지 태그들에 스크롤 없애기 (캡쳐시 css로 숨긴 스크롤이 보이는 현상때문에 설정)
    $("#wasMap *").not(".was-map-area,.was-map-area *").css("overflow","hidden");
    
    domtoimage.toBlob(document.getElementById("wasMap")).then(function(blob) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            openMapLayer(obj, "screenshot");
            $("#map-screenshot").append("<img src='" + reader.result + "' alt='인쇄하기이미지'>");
            
            //지도 영역 태그와 그 밑에 있는 자식태그 모두 제외한 나머지 태그들에 스크롤 초기화하기
            $("#wasMap *").not(".was-map-area,.was-map-area *").css("overflow","");

            if ($("#map-screenshot img").length > 0) {
                var screenshotAreaHeight = $("#map-screenshot").height();
                var screenshotCanvasHeight = $("#map-screenshot").find("img").height();

                if (screenshotAreaHeight > screenshotCanvasHeight) {
                    $("#map-screenshot").addClass("not-over");
                } else {
                    $("#map-screenshot").removeClass("not-over");
                }
            }
            
            $(".preloader").removeClass("on");
            
            var mapLayerObj = $("#map-screenshot").closest(".map-layer-wrap");

            $(mapLayerObj).find(".print-btn").click(function() {
                openCanvasPrint(reader.result);
            });
        }
        
        reader.readAsDataURL(blob);
  });
}
//20221101 수정부분 end
//20220926 수정부분 end

//관망도조회 상단 탭 클릭시
function setMapTopTab(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var dataTabId = $(obj).attr("data-tab-id");
    
    $(mapLayerObj).find(".map-toptab-area").find(".map-toptab-list").children("li").removeClass("on");
    $(mapLayerObj).find(".map-toptab-con").removeClass("on");
    $(obj).parent("li").addClass("on");
    $(mapLayerObj).find(".map-toptab-con#" + dataTabId).addClass("on");
}

//관망도조회 내용 안에 탭 클릭시
function setMapConTab(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var dataTabId = $(obj).attr("data-tab-id");
    
    $(mapLayerObj).find(".map-contab-area").find(".map-contab-list").children("li").removeClass("on");
    $(mapLayerObj).find(".map-contab-con").removeClass("on");
    $(obj).parent("li").addClass("on");
    $(mapLayerObj).find(".map-contab-con#" + dataTabId).addClass("on");
}

//20220713 수정부분 start
//관망도조회 레이어 전체선택/전체선택해제
function setMapLayerCheckAll(obj,type) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    if ($(mapLayerObj).hasClass("map-layer00")) {
        //레이어창
        $(mapLayerObj).find(".map-layer-list-area").find(".map-list").children("li").removeClass("last-checked");

        if (type == "on") {
            //1depth
            $(mapLayerObj).find(".map-layer-list-area").children(".map-list").children("li").children(".map-list-tit").find("input[type='checkbox']").each(function() {
                $(this).prop("checked",true);
                $(this).closest("li").not("li.parent").addClass("checked");
            });

            //2depth (첫번째 항목만 체크)
            $(mapLayerObj).find(".map-layer-list-area").children(".map-list").children("li").children(".map-list").children("li:first-child").children(".map-list-tit").find("input[type='checkbox']").each(function() {
                $(this).prop("checked",true);
                $(this).closest("li").not("li.parent").addClass("checked");
            });

            //3depth
            $(mapLayerObj).find(".map-layer-list-area").children(".map-list").children("li").children(".map-list").children("li:first-child").children(".map-list").children("li").children(".map-list-tit").find("input[type='checkbox']").each(function() {
                $(this).prop("checked",true);
                $(this).closest("li").not("li.parent").addClass("checked");
            });
        } else if (type == "off") {
            $(mapLayerObj).find(".map-layer-list-area").find(".map-list").children("li").children(".map-list-tit").find("input[type='checkbox']:checked").each(function() {
                $(this).prop("checked",false);
                $(this).closest("li").not("li.parent").removeClass("checked");
            });
        }
    } else if ($(mapLayerObj).hasClass("map-layer05")) {
        //레이어 추가/제거창
        if (type == "on") {
            $(mapLayerObj).find(".map-setting-all-item").find(".map-setting-list").children("li").find("input[type='checkbox']").each(function() {
                $(this).prop("checked",true);
            });
        } else if (type == "off") {
            $(mapLayerObj).find(".map-setting-all-item").find(".map-setting-list").children("li").find("input[type='checkbox']").each(function() {
                $(this).prop("checked",false);
            });
        }
        
        setMapSettingCheck(obj,"check");
    }
}

//관망도조회 레이어 체크박스 체크시
function setMapLayerCheck(obj,type) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    $(mapLayerObj).find(".map-layer-list-area").find(".map-list").children("li").removeClass("last-checked");
    
    if (type == "start") {
        $(mapLayerObj).find(".map-list").children("li").not("li.parent").children(".map-list-tit").find("input[type='checkbox']").each(function() {
            if ($(this).is(":checked")) {
                $(this).closest("li").addClass("checked");
            } else {
                $(this).closest("li").removeClass("checked");
            }
        });
    } else if (type == "check") {
        if ($(obj).is(":checked")) {
            $(obj).closest("li").not("li.parent").addClass("checked last-checked");
        } else {
            $(obj).closest("li").removeClass("checked");
        }
    }
}
//20220713 수정부분 end

//관망도조회 리스트 속성검색 보이기&숨기기
function setMapListSearch(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    //20220719 수정부분 start
    if ($(obj).closest(".map-toptab-con").length > 0) {
        mapLayerObj = $(obj).closest(".map-toptab-con");
    }
    //20220719 수정부분 end
    
    if ($(mapLayerObj).find(".map-topsearch-area").hasClass("on")) {
        $(obj).removeClass("c-btn01");
        $(mapLayerObj).find(".map-topsearch-area").removeClass("on");
    } else {
        $(obj).addClass("c-btn01");
        $(mapLayerObj).find(".map-topsearch-area").addClass("on");
    }
}

//관망도조회 리스트 속성검색 검색시
function setMapListSearchResult(obj,mapLayerType) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    if (mapLayerType.indexOf("ledgerList") > -1) {
        setMapLedgerGrid(obj,mapLayerType);
    } else if (mapLayerType.indexOf("infoList") > -1) {
        setMapInfoGrid(obj,mapLayerType);
    }
    
    $(mapLayerObj).find(".search-btn").removeClass("c-btn01");
    $(mapLayerObj).find(".map-topsearch-area").removeClass("on");
}

//관망도조회 리스트 선택한 항목 선택해제시
function setMapListClear(obj,mapLayerType) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var gridCheckedArr = [];
    
    if (mapLayerType.indexOf("ledgerList") > -1 && mapLedgerGrid != undefined) {
        gridCheckedArr = mapLedgerGrid.getCheckedRowKeys();
        
        mapLedgerGrid.uncheckAll();
        
        for (var i=0; i<gridCheckedArr.length; i++) {
            mapLedgerGrid.removeRowClassName(gridCheckedArr[i],"grid-label00");
        }
    } else if (mapLayerType.indexOf("infoList") > -1 && mapInfoGrid != undefined) {
        gridCheckedArr = mapInfoGrid.getCheckedRowKeys();
        
        mapInfoGrid.uncheckAll();
        
        for (var i=0; i<gridCheckedArr.length; i++) {
            mapInfoGrid.removeRowClassName(gridCheckedArr[i],"grid-label00");
        }
    }
    
    $(mapLayerObj).find(".dynamic-grid-area").find(".tui-grid-body-area").attr("grid-selected","");

    $(mapLayerObj).find(".clear-btn").prop("disabled",true);
    $(mapLayerObj).find(".position-btn").prop("disabled",true);
    $(mapLayerObj).find(".detail-btn").prop("disabled",true);
    
    //20220712 수정부분 start
    $(mapLayerObj).find(".selected-btn").prop("disabled",true);
    $(mapLayerObj).find(".convert-btn").prop("disabled",true);
    $(mapLayerObj).find(".sms-btn").prop("disabled",true);
    //20220712 수정부분 end
    
    //20220719 수정부분 start
    $(mapLayerObj).find(".connect-btn").prop("disabled",true);
    //20220719 수정부분 end
}

//20220719 수정부분 start
function setMapRfidConnect(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    openLayer("alert","RFID 인식은 안드로이드 앱에서만 가능합니다.","");
}
//20220719 수정부분 end

//관망도조회 상단 탭 클릭시 대장상세의 리스트 그리드 노출
function setMapTopTabGrid(obj,mapLayerType) {
    if (mapLayerType.indexOf("ledgerDetail") > -1) {
        setMapLedger2Grid($(".map-layer02 .map-ledger-list-area"),mapLayerType);
    } else if (mapLayerType.indexOf("waterCut") > -1) {
        setMapWatercutGrid($(".map-layer06 .map-watercut-list-area"),mapLayerType);
        
    //20220719 수정부분 start
    } else if (mapLayerType.indexOf("waterSupply") > -1) {
        setMapWatersupplyGrid($(".map-layer07 .map-watersupply-list-area"),mapLayerType);
    }
    //20220719 수정부분 end
    
    setMapTopTab(obj);
}

//관망도조회 정보상세에서 수정버튼 클릭시
function setMapDetailModify(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    $(mapLayerObj).find(".modify-btn").prop("disabled",true);
    $(mapLayerObj).find(".save-btn").prop("disabled",false);
    $(mapLayerObj).find(".cancel-btn").prop("disabled",false);
    $(mapLayerObj).find(".map-input-list").find("input,select,button").not(".only-disabled").prop("disabled",false);
}

//20220713 수정부분 start
//관망도조회 레이어 설정 체크박스 체크시 (label 값으로 처리함)
function setMapSettingCheck(obj,type) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var selectedHtml = "";
    
    if (type == "start" || type == "check") {
        $(mapLayerObj).find(".map-setting-all-item").find(".map-setting-list").children("li").find("input[type='checkbox']:checked").each(function() {
            var labelName = $(this).closest("li").children(".map-setting-name").children("label").attr("for");
            
            selectedHtml += "<li>";
            selectedHtml += "    <div class='map-setting-name'>";
            selectedHtml += "        <label for='" + labelName + "'>" + $(this).closest("li").find(".map-setting-name").text().trim() + "</label>";
            selectedHtml += "    </div>";
            selectedHtml += "    <div class='map-setting-check'>";
            selectedHtml += "        <button type='button' class='map-setting-check-btn' onclick='setMapSettingCheck(this,\"delete\");'>";
            selectedHtml += "            <span><img src='img/close.svg' alt='삭제'></span>";
            selectedHtml += "        </button>";
            selectedHtml += "    </div>";
            selectedHtml += "</li>";
        });
        
        if ($(mapLayerObj).find(".map-setting-selected-item").length > 0) {
            $(mapLayerObj).find(".map-setting-selected-item").find(".map-setting-list").html(selectedHtml);
        }
    } else if (type == "delete") {
        var labelName = $(obj).closest("li").children(".map-setting-name").children("label").attr("for");
        
        $(mapLayerObj).find(".map-setting-all-item").find(".map-setting-list").children("li").find("label[for='" + labelName + "']").closest("li").children(".map-setting-check").find("input[type='checkbox']").prop("checked",false);
        $(obj).closest("li").remove();
    }
}

//관망도조회 레이어 설정 사용자 그룹 추가
function addMapLayerUserGroup(obj) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var userGroupName = prompt("추가할 그룹명을 입력해주세요.");
    
    //20220714 수정부분 start
    if (userGroupName != "" && userGroupName != null) {
        $(mapLayerObj).find(".map-setting-selected-item").find(".map-setting-top-input").find("select").append("<option value='" + userGroupName + "'>" + userGroupName + "</option>");
    } else if (userGroupName != null) {
        alert("추가할 그룹명을 입력해주세요.");
    }
    //20220714 수정부분 end
}
//20220713 수정부분 end

//관망도조회 단수분석 레이어 팝업 열기
function openMapWatercutLayer(param1,param2) {
    var timer = 5; //5초후에 레이어 팝업 열기
    $(".preloader").addClass("on");
    
    watercutInterval = setInterval(function() {
        if (timer == 1) {
            clearInterval(watercutInterval);
            
            $(".preloader").removeClass("on");
            
            openMapLayer(this,'waterCut');
        } else {
            --timer;
        }
    }, 1000);
}

//관망도조회 대장리스트 그리드 그리기
function setMapLedgerGrid(obj,mapLayerType) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    if ($("#mapLedgerGrid").length > 0) {
        $("#mapLedgerGrid").remove();
    }
    
    $(mapLayerObj).find(".clear-btn").prop("disabled",true);
    $(mapLayerObj).find(".position-btn").prop("disabled",true);
    $(mapLayerObj).find(".detail-btn").prop("disabled",true);
    
    //20220712 수정부분 start
    $(mapLayerObj).find(".selected-btn").prop("disabled",true);
    $(mapLayerObj).find(".convert-btn").prop("disabled",true);
    $(mapLayerObj).find(".sms-btn").prop("disabled",true);
    //20220712 수정부분 end
    
    //20220719 수정부분 start
    $(mapLayerObj).find(".connect-btn").prop("disabled",true);
    //20220719 수정부분 end
    
    //그리드 그리기
    $(mapLayerObj).find("#map-ledger-grid-area").append("<div id='mapLedgerGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    gridBodyHeight = (winWidth < 576) ? (winHeight - 304) : (winHeight - 357);
    //그리드 body 최대높이 설정
    gridBodyHeight = (gridBodyHeight > 217) ? 217 : gridBodyHeight;
    
    //20220803 수정부분 start
    if ($(mapLayerObj).attr("data-resize-flag") == "Y") {
        var gridListHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").height();
        var gridListResultHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").find(".map-list-result").height();

        gridBodyHeight = gridListHeight - gridListResultHeight - 42;
    }
    //20220803 수정부분 end
    
    if (mapLayerType == "ledgerList00") {
        //유량계_전체 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA117',column01:'1',column02:'영흥면',column03:'남동부수도사업소',column04:'',column05:'',column06:'20150511',column07:'100',column08:'',column09:'(주)씨엠엔텍',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동코드',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관경',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'현재상태',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'제작회사명',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList01") {
        //수압측정지점_전체 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA912',column01:'1',column02:'계산1동',column03:'북부수도사업소',column04:'',column05:'',column06:'계양구',column07:'245',column08:'',column09:'2018-02-14 00:00',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동코드',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'시리얼번호',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록구',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'사업소',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'위치',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'갱신일',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList02") {
        //수질측정지점 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA911',column01:'1',column02:'가좌2동',column03:'수도시설관리소',column04:'서구',column05:'서부수도사업소',column06:'141.8',column07:'2020-04-23 00:00',column08:'',column09:'835',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동코드',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록구',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'사업소',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'위치',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'갱신일',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'라벨',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'블록코드',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList03") {
        //수위측정지점 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA911',column01:'1',column02:'가좌2동',column03:'수도시설관리소',column04:'서구',column05:'서부수도사업소',column06:'141.8',column07:'2020-04-23 00:00',column08:'',column09:'835',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동코드',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록구',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'사업소',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'위치',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'갱신일',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'라벨',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'블록코드',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList04") {
        //상수관로_전체 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'',column01:'200.000000',column02:'',column03:'상수관로',column04:'1',column05:'백령면',column06:'20050227',column07:'배수관',column08:'1752.627213',column09:'2005/HI-3P/200/1752...',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'블록',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'구경',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'비상관로',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'지형지물부호',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관용도',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'연장',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관라벨',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList05") {
        //상수관로심도 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'{838DEAC1-555F-4C...',column01:'SA923',column02:'00007969',column03:'2820052100',column04:'MNGT220',column05:'200',column06:'2008-06-24 00:00',column07:'510',column08:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'GLOBALID',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'지형지물부호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리번호',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'사업소',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'갱신일',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'블록',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column08',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList06") {
        //제수변_전체 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA200',column01:'23303',column02:'교동면',column03:'강화수도사업소',column04:'20180058',column05:'',column06:'0',column07:'353',column08:'개',column09:'20181215',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동코드',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'대장초기화여부',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'각도',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개폐여부',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList07") {
        //제수변_자동드레인 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA200',column01:'0000.0',column02:'2022-05-16',column03:'23303',column04:'교동면',column05:'강화수도사업소',column06:'20180058',column07:'',column08:'0',column09:'353',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'방출량',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'방출일시',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동코드',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'대장초기화여부',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'각도',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    
    //20220714 수정부분 start
    } else if (mapLayerType == "ledgerList08") {
        //급수관로 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'904',column01:'32',column02:'',column03:'급수관로',column04:'7',column05:'교동면',column06:'20170325',column07:'급수관',column08:'32.06999969',column09:'2017/STS/32/57.52',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'블록코드',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'구경',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'비상관로',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'지형지물부호',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동코드',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관용도',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'연장',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관라벨',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList09") {
        //누수불출수지점 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'누수지점',column01:'00202178',column02:'용현5동',column03:'중부수도사업소',column04:'20090170',column05:'',column06:'',column07:'50.000000',column08:'',column09:'',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'대장초기화여부',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관경',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관로지형지물부호',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관로관리번호',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList10") {
        //소화전 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA119',column01:'4',column02:'가좌1동',column03:'소방서',column04:'20160044',column05:'',column06:'0',column07:'0',column08:'정상',column09:'',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'대장초기화여부',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'각도',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'현재상태',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'소화전형식',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList11") {
        //수도전 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA122',column01:'184',column02:'강화읍',column03:'강화수도사업소',column04:'',column05:'',column06:'0',column07:'1996-09-30',column08:'',column09:'급수관로',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'대장초기화여부',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'제작회사명',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관로지형지물부호',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList12") {
        //급수구역 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'급수구역',column01:'00000348',column02:'서부수도사업소',column03:'연희동 378일원',column04:'0',column05:'0',column06:'630000.000000',column07:'',column08:'1',column09:'2014-07-16 00:00',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'급수구역명',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'급수구역세대수',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'급구구역인구수',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'급수구역면적',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관라벨',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'시스템사용',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'갱신일',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList13") {
        //기타변류 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA201',column01:'61970',column02:'옥련1동',column03:'남동부수도사업소',column04:'',column05:'',column06:'0',column07:'65',column08:'',column09:'',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'대장초기화여부',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'각도',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개폐여부',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList14") {
        //상수숨은관로 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'204',column01:'50.000000',column02:'상수관로',column03:'7098',column04:'화수1',column05:'20080808',column06:'SAA000',column07:'중부수도사업소',column08:'ASP',column09:'',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'블록',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'구경',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'지형지물부호',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관용도',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관재질',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'대장초기화여부',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList15") {
        //세척구 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA941',column01:'2',column02:'2820067000',column03:'MNGT200',column04:'20120017',column05:'20090101',column06:'100',column07:'남동구',column08:'200',column09:'',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설치일자',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관경',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록구',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'사업소',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'위치',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList16") {
        //저수조 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA120',column01:'2',column02:'계산2동',column03:'소방서',column04:'200770814',column05:'',column06:'',column07:'',column08:'',column09:'',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'준공일자',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'대장초기화여부',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'건물주소',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'허가일자',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'건물유형',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList17") {
        //정수장 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'SA113',column01:'2',column02:'',column03:'수자원공사',column04:'',column05:'',column06:'0',column07:'',column08:'',column09:'',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'지형지물부호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정읍면동',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'취수장명',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'준공일자',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'부지면적',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'도엽번호',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'수원구분',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
        
    //20220719 수정부분 start
    } else if (mapLayerType == "ledgerList18") {
        //RFID태그 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'2971',column01:'115',column02:'200',column03:'제수변',column04:'21690',column05:'연희동',column06:'서부수도사업소',column07:'86.000000',column08:'1',column09:'20131227',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'Objectid',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'ASSETGROUP',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'ASSETTYPE',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'지형지물부호',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'HJD_CDE',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'사업소',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'ANG_DIR',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'OFF_CDE',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'IST_YMD',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerList19") {
        //RFID테이블 검색결과
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'64806',column01:'배기변',column02:'상수관로',column03:'비폐',column04:'인천시 남동구',column05:'',column06:'상수관로',column07:'550',column08:'648',column09:'1.5X1.2X1.3',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'개별번호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'시설물',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'절개형태',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'폐쇄여부',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록구',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'행정동',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관리기관',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'블록',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'뚜껑규격',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'변실규격',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    }
    //20220719 수정부분 end
    //20220714 수정부분 end

    mapLedgerGrid = new tui.Grid({
        el: document.getElementById('mapLedgerGrid'),
        scrollX: true,
        scrollY: true,
        rowHeaders: ['checkbox'],
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true,
        columnOptions: {
            resizable: true
        }
    });
    
    //20220803 수정부분 start
    //리사이즈시
    $(window).resize(function() {
        //레이어 팝업 내용이 보일 경우에만 리사이즈시 그리드 새로고침
        if (!$(mapLayerObj).hasClass("hide")) {
            var gridListHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").height();
            var gridListResultHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").find(".map-list-result").height();
            var gridListBodyHeight = $(mapLayerObj).find("#map-ledger-grid-area").find(".tui-grid-body-area").innerHeight();
            var gridReBodyHeight = gridListHeight - gridListResultHeight - 42;

            if (parseInt(gridReBodyHeight) != gridListBodyHeight) {
                mapLedgerGrid.setBodyHeight(gridReBodyHeight);
            }

            mapLedgerGrid.refreshLayout();
        }
    });
    
    $(mapLayerObj).resize(function() {
        var gridListHeight = $(this).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").height();
        var gridListResultHeight = $(this).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").find(".map-list-result").height();
        var gridReBodyHeight = gridListHeight - gridListResultHeight - 42;
        
        mapLedgerGrid.setBodyHeight(gridReBodyHeight);
        
        mapLedgerGrid.refreshLayout();
    });
    
    //레이어 팝업 내용 보이기 버튼 클릭시 그리드 새로고침
    $(mapLayerObj).find(".map-layer-box").find(".map-layer-tit-area").find(".map-layer-tit-btn").find(".map-show-btn").click(function() {
        if (!$(mapLayerObj).hasClass("hide")) {
            var gridListHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").height();
            var gridListResultHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").find(".map-list-result").height();
            var gridReBodyHeight = gridListHeight - gridListResultHeight - 42;
            
            mapLedgerGrid.setBodyHeight(gridReBodyHeight);

            mapLedgerGrid.refreshLayout();
        }
    });
    //20220803 수정부분 end
    
    //대장리스트의 항목 체크시
    mapLedgerGrid.on("check",function(event) {        
        var gridCheckedArr = mapLedgerGrid.getCheckedRowKeys();
        var gridChecked = "";
        
        for (var i=0; i<gridCheckedArr.length; i++) {
            if (gridChecked != "") gridChecked += ",";
            gridChecked += gridCheckedArr[i];
        }
        
        mapLedgerGrid.addRowClassName(event.rowKey,"grid-label00");
        
        $("#map-ledger-grid-area .tui-grid-body-area").attr("grid-selected",gridChecked);
        
        //항목을 1개이상 선택했을 경우 선택해제/위치확인/대장보기 버튼 활성화
        if (gridCheckedArr.length > 0) {
            $(mapLayerObj).find(".clear-btn").prop("disabled",false);
            $(mapLayerObj).find(".position-btn").prop("disabled",false);
            $(mapLayerObj).find(".detail-btn").prop("disabled",false);
            
            //20220712 수정부분 start
            $(mapLayerObj).find(".selected-btn").prop("disabled",false);
            $(mapLayerObj).find(".convert-btn").prop("disabled",false);
            $(mapLayerObj).find(".sms-btn").prop("disabled",false);
            //20220712 수정부분 end
            
            //20220719 수정부분 start
            $(mapLayerObj).find(".connect-btn").prop("disabled",false);
            //20220719 수정부분 end
        } else {
            $(mapLayerObj).find(".clear-btn").prop("disabled",true);
            $(mapLayerObj).find(".position-btn").prop("disabled",true);
            $(mapLayerObj).find(".detail-btn").prop("disabled",true);
            
            //20220712 수정부분 start
            $(mapLayerObj).find(".selected-btn").prop("disabled",true);
            $(mapLayerObj).find(".convert-btn").prop("disabled",true);
            $(mapLayerObj).find(".sms-btn").prop("disabled",true);
            //20220712 수정부분 end
            
            //20220719 수정부분 start
            $(mapLayerObj).find(".connect-btn").prop("disabled",true);
            //20220719 수정부분 end
        }
    });
    
    //대장리스트의 항목 체크해제시
    mapLedgerGrid.on("uncheck",function(event) {
        var gridCheckedArr = mapLedgerGrid.getCheckedRowKeys();
        var gridChecked = "";
        
        for (var i=0; i<gridCheckedArr.length; i++) {
            if (gridChecked != "") gridChecked += ",";
            gridChecked += gridCheckedArr[i];
        }
        
        mapLedgerGrid.removeRowClassName(event.rowKey,"grid-label00");
        
        $("#map-ledger-grid-area .tui-grid-body-area").attr("grid-selected",gridChecked);
        
        //항목을 1개이상 선택했을 경우 선택해제/위치확인/대장보기 버튼 활성화
        if (gridCheckedArr.length > 0) {
            $(mapLayerObj).find(".clear-btn").prop("disabled",false);
            $(mapLayerObj).find(".position-btn").prop("disabled",false);
            $(mapLayerObj).find(".detail-btn").prop("disabled",false);
            
            //20220712 수정부분 start
            $(mapLayerObj).find(".selected-btn").prop("disabled",false);
            $(mapLayerObj).find(".convert-btn").prop("disabled",false);
            $(mapLayerObj).find(".sms-btn").prop("disabled",false);
            //20220712 수정부분 end
            
            //20220719 수정부분 start
            $(mapLayerObj).find(".connect-btn").prop("disabled",false);
            //20220719 수정부분 end
        } else {
            $(mapLayerObj).find(".clear-btn").prop("disabled",true);
            $(mapLayerObj).find(".position-btn").prop("disabled",true);
            $(mapLayerObj).find(".detail-btn").prop("disabled",true);
            
            //20220712 수정부분 start
            $(mapLayerObj).find(".selected-btn").prop("disabled",true);
            $(mapLayerObj).find(".convert-btn").prop("disabled",true);
            $(mapLayerObj).find(".sms-btn").prop("disabled",true);
            //20220712 수정부분 end
            
            //20220719 수정부분 start
            $(mapLayerObj).find(".connect-btn").prop("disabled",true);
            //20220719 수정부분 end
        }
    });
    
    //대장리스트의 항목 클릭시
    mapLedgerGrid.on("click", function(event) {
        if (event.rowKey != undefined && event.columnName != "_checked") {      
            var gridCheckedArr = mapLedgerGrid.getCheckedRowKeys();
            
            if (gridCheckedArr.indexOf(event.rowKey) > -1) {
                mapLedgerGrid.uncheck(event.rowKey);
            } else {
                mapLedgerGrid.check(event.rowKey);
                
            }
        }
    });
}

//관망도조회 대장상세의 리스트 그리드 그리기
function setMapLedger2Grid(obj,mapLayerType) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    if ($("#mapLedger2Grid").length > 0) {
        $("#mapLedger2Grid").remove();
    }
    
    $(mapLayerObj).find(".map-ledger2-list-area").removeClass("on");
    
    //그리드 그리기
    $(mapLayerObj).find("#map-ledger2-grid-area").append("<div id='mapLedger2Grid' class='dynamicGrid'></div>");

    var gridBodyHeight2 = 'auto';
    var gridData2 = [];
    var gridColumns2 = [];
    var gridHeader2 = {};
    var hdComplexColumns2 = [];
    var gridSummary2 = {};
    var smColumnContent2 = {};

    //그리드 body 높이 설정
    gridBodyHeight2 = 137;
    
    if (mapLayerType == "ledgerDetail04") {
        //제수변_전체 대장
        //데이터 가져오기
        for (var i=0; i<3; i++) {
            gridData2.push({column00:'중부수도사업소',column01:'20060035',column02:'2006',column03:'공사명1',column04:'누수',column05:'홍길동',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns2.push({header:'관리기관',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'공사번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'기준년도',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'공사명',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'공사구분',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'공사감독자',name:'column05',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "ledgerDetail06") {
        //제수변_전체 대장
        //데이터 가져오기
        for (var i=0; i<3; i++) {
            gridData2.push({column00:'중부수도사업소',column01:'23303',column02:'SA200',column03:'개',column04:'개폐사유',column05:'작업자',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns2.push({header:'관리기관',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'지형지물부호',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'개폐유무',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'개폐사유',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns2.push({header:'작업자',name:'column05',minWidth: '120',whiteSpace: ''});
    }

    mapLedger2Grid = new tui.Grid({
        el: document.getElementById('mapLedger2Grid'),
        scrollX: true,
        scrollY: true,
        rowHeaders: ['checkbox'],
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight2,
        minBodyHeight: 137,
        data: gridData2,
        columns: gridColumns2,
        header: gridHeader2,
        summary: gridSummary2,
        showDummyRows: true,
        columnOptions: {
            resizable: true
        }
    });
    
    //20220803 수정부분 start
    $(mapLayerObj).resize(function() {
        mapLedger2Grid.refreshLayout();
    });
    
    //레이어 팝업 내용 보이기 버튼 클릭시 그리드 새로고침
    $(mapLayerObj).find(".map-layer-box").find(".map-layer-tit-area").find(".map-layer-tit-btn").find(".map-show-btn").click(function() {
        if (!$(mapLayerObj).hasClass("hide")) {
            mapLedger2Grid.refreshLayout();
        }
    });
    //20220803 수정부분 end
    
    //대장상세의 리스트 항목 체크시
    mapLedger2Grid.on("check",function(event) {
        var gridSelected = $("#map-ledger2-grid-area .tui-grid-body-area").attr("grid-selected");
        
        if (gridSelected == undefined) {
            gridSelected = "";
        }
        
        if (gridSelected != "") {
            mapLedger2Grid.uncheck(gridSelected);
            
            mapLedger2Grid.removeRowClassName(gridSelected,"grid-label00");
        }
        
        mapLedger2Grid.addRowClassName(event.rowKey,"grid-label00");
        
        $("#map-ledger2-grid-area .tui-grid-body-area").attr("grid-selected",event.rowKey);
        
        $(mapLayerObj).find(".map-ledger2-list-area").addClass("on");
    });
    
    //대장상세의 리스트 항목 체크해제시
    mapLedger2Grid.on("uncheck",function(event) {
        mapLedger2Grid.removeRowClassName(event.rowKey,"grid-label00");
        
        $("#map-ledger2-grid-area .tui-grid-body-area").attr("grid-selected","");
        
        $(mapLayerObj).find(".map-ledger2-list-area").removeClass("on");
    });
    
    //대장상세의 리스트 항목 클릭시
    mapLedger2Grid.on("click", function(event) {
        if (event.rowKey != undefined && event.columnName != "_checked") {      
            var gridCheckedArr = mapLedger2Grid.getCheckedRowKeys();
            
            if (gridCheckedArr.indexOf(event.rowKey) > -1) {
                mapLedger2Grid.uncheck(event.rowKey);
            } else {
                mapLedger2Grid.check(event.rowKey);
                
            }
        }
    });
}

//관망도조회 정보리스트 그리드 그리기
function setMapInfoGrid(obj,mapLayerType) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    
    if ($("#mapInfoGrid").length > 0) {
        $("#mapInfoGrid").remove();
    }
    
    $(mapLayerObj).find(".clear-btn").prop("disabled",true);
    $(mapLayerObj).find(".position-btn").prop("disabled",true);
    $(mapLayerObj).find(".detail-btn").prop("disabled",true);
    
    //20220712 수정부분 start
    $(mapLayerObj).find(".selected-btn").prop("disabled",true);
    $(mapLayerObj).find(".convert-btn").prop("disabled",true);
    $(mapLayerObj).find(".sms-btn").prop("disabled",true);
    //20220712 수정부분 end
    
    //20220719 수정부분 start
    $(mapLayerObj).find(".connect-btn").prop("disabled",true);
    //20220719 수정부분 end
    
    //그리드 그리기
    $(mapLayerObj).find("#map-info-grid-area").append("<div id='mapInfoGrid' class='dynamicGrid'></div>");

    var gridBodyHeight = 'auto';
    var gridData = [];
    var gridColumns = [];
    var gridHeader = {};
    var hdComplexColumns = [];
    var gridSummary = {};
    var smColumnContent = {};

    //그리드 body 높이 설정
    gridBodyHeight = (winWidth < 576) ? (winHeight - 304) : (winHeight - 357);
    //그리드 body 최대높이 설정
    gridBodyHeight = (gridBodyHeight > 217) ? 217 : gridBodyHeight;
    
    //20220803 수정부분 start
    if ($(mapLayerObj).attr("data-resize-flag") == "Y") {
        var gridListHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").height();
        var gridListResultHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").find(".map-list-result").height();

        gridBodyHeight = gridListHeight - gridListResultHeight - 42;
    }
    //20220803 수정부분 end
    
    if (mapLayerType == "infoList00") {
        //공공측량정보 목록
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'중부수도사업소',column01:'상수관로',column02:'2006',column03:'2006-05-17',column04:'업체명',column05:'담당자',column06:'2006-05-17',column07:'2006-05-17',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'관리기관',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'지형지물부호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'기준년도',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'업로드일자',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'측량업체명',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'측량업체담당자',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록일',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'수정일',name:'column07',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "infoList01") {
        //관세척정보 목록
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'중부수도사업소',column01:'1',column02:'상수관로',column03:'2006',column04:'업체명',column05:'등록자',column06:'2006-05-17',column07:'2006-05-17',column08:'200.000000',column09:'',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'관리기관',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'지형지물부호',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'기준년도',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'시공업체',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록자',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관세척시작일',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관세척종료일',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'구경',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'관종',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "infoList02") {
        //밸브정보 목록
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'중부수도사업소',column01:'1',column02:'제수변',column03:'개',column04:'',column05:'작업자',column06:'등록자',column07:'2006-05-17',column08:'',column09:'835',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'관리기관',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개별번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'지형지물부호',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개폐유무',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'개폐사유',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'작업자',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록자',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'등록일',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'비고',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'블록코드',name:'column09',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "infoList03") {
        //공사정보 목록
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'중부수도사업소',column01:'20060034',column02:'2006',column03:'공사명1',column04:'누수',column05:'입력자',column06:'2006-05-17',column07:'2006-05-17',column08:'2006-05-17',column09:'설계자',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'관리기관',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사번호',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'기준년도',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사명',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'공사구분',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'입력자',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'계약일',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'최초입력일',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'착공일',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'설계자',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "infoList04") {
        //현장정보 목록
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'1',column01:'현장정보구분',column02:'인천광역시...',column03:'835',column04:'중부수도사업소',column05:'홍길동',column06:'010-1234-1234',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'접수번호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'현장정보구분',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'현장정보주소',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'블록코드',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'담당자기관',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'담당자명',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'담당자연락처',name:'column06',minWidth: '120',whiteSpace: ''});
    } else if (mapLayerType == "infoList05") {
        //민원신고 목록
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData.push({column00:'1',column01:'2022-05-17 00:00',column02:'민원종류',column03:'2022-05-17',column04:'민원인성명',column05:'민원인구분',column06:'민원내용',column07:'032-1234-1234',column08:'010-1234-1234',column09:'중부수도사업소',column10:'...',_attributes:{className:{row:['grid-pointer']}}});
        }

        //전체 항목 가져오기
        gridColumns.push({header:'접수번호',name:'column00',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'접수일자',name:'column01',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'민원종류',name:'column02',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'민원일자',name:'column03',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'민원인성명',name:'column04',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'민원인구분',name:'column05',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'민원내용',name:'column06',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'일반전화번호',name:'column07',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'휴대전화번호',name:'column08',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'접수자관리기관',name:'column09',minWidth: '120',whiteSpace: ''});
        gridColumns.push({header:'...',name:'column10',minWidth: '120',whiteSpace: ''});
    }

    mapInfoGrid = new tui.Grid({
        el: document.getElementById('mapInfoGrid'),
        scrollX: true,
        scrollY: true,
        rowHeaders: ['checkbox'],
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight,
        minBodyHeight: 137,
        data: gridData,
        columns: gridColumns,
        header: gridHeader,
        summary: gridSummary,
        showDummyRows: true,
        columnOptions: {
            resizable: true
        }
    });
    
    //20220803 수정부분 start
    //리사이즈시
    $(window).resize(function() {
        //레이어 팝업 내용이 보일 경우에만 리사이즈시 그리드 새로고침
        if (!$(mapLayerObj).hasClass("hide")) {
            var gridListHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").height();
            var gridListResultHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").find(".map-list-result").height();
            var gridListBodyHeight = $(mapLayerObj).find("#map-info-grid-area").find(".tui-grid-body-area").innerHeight();
            var gridReBodyHeight = gridListHeight - gridListResultHeight - 42;

            if (parseInt(gridReBodyHeight) != gridListBodyHeight) {
                mapInfoGrid.setBodyHeight(gridReBodyHeight);
            }

            mapInfoGrid.refreshLayout();
        }
    });
    
    $(mapLayerObj).resize(function() {
        var gridListHeight = $(this).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").height();
        var gridListResultHeight = $(this).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").find(".map-list-result").height();
        var gridReBodyHeight = gridListHeight - gridListResultHeight - 42;
        
        mapInfoGrid.setBodyHeight(gridReBodyHeight);
        
        mapInfoGrid.refreshLayout();
    });
    
    //레이어 팝업 내용 보이기 버튼 클릭시 그리드 새로고침
    $(mapLayerObj).find(".map-layer-box").find(".map-layer-tit-area").find(".map-layer-tit-btn").find(".map-show-btn").click(function() {
        if (!$(mapLayerObj).hasClass("hide")) {
            var gridListHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").height();
            var gridListResultHeight = $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-list-area").find(".map-list-result").height();
            var gridReBodyHeight = gridListHeight - gridListResultHeight - 42;

            mapInfoGrid.setBodyHeight(gridReBodyHeight);

            mapInfoGrid.refreshLayout();
        }
    });
    //20220803 수정부분 end
    
    //정보리스트의 항목 체크시
    mapInfoGrid.on("check",function(event) {
        var gridCheckedArr = mapInfoGrid.getCheckedRowKeys();
        var gridChecked = "";
        
        for (var i=0; i<gridCheckedArr.length; i++) {
            if (gridChecked != "") gridChecked += ",";
            gridChecked += gridCheckedArr[i];
        }
        
        mapInfoGrid.addRowClassName(event.rowKey,"grid-label00");
        
        $("#map-info-grid-area .tui-grid-body-area").attr("grid-selected",gridChecked);
        
        //항목을 1개이상 선택했을 경우 선택해제/위치확인/대장보기 버튼 활성화
        if (gridCheckedArr.length > 0) {
            $(mapLayerObj).find(".clear-btn").prop("disabled",false);
            $(mapLayerObj).find(".position-btn").prop("disabled",false);
            $(mapLayerObj).find(".detail-btn").prop("disabled",false);
            
            //20220712 수정부분 start
            $(mapLayerObj).find(".selected-btn").prop("disabled",false);
            $(mapLayerObj).find(".convert-btn").prop("disabled",false);
            $(mapLayerObj).find(".sms-btn").prop("disabled",false);
            //20220712 수정부분 end
            
            //20220719 수정부분 start
            $(mapLayerObj).find(".connect-btn").prop("disabled",false);
            //20220719 수정부분 end
        } else {
            $(mapLayerObj).find(".clear-btn").prop("disabled",true);
            $(mapLayerObj).find(".position-btn").prop("disabled",true);
            $(mapLayerObj).find(".detail-btn").prop("disabled",true);
            
            //20220712 수정부분 start
            $(mapLayerObj).find(".selected-btn").prop("disabled",true);
            $(mapLayerObj).find(".convert-btn").prop("disabled",true);
            $(mapLayerObj).find(".sms-btn").prop("disabled",true);
            //20220712 수정부분 end
            
            //20220719 수정부분 start
            $(mapLayerObj).find(".connect-btn").prop("disabled",true);
            //20220719 수정부분 end
        }
    });
    
    //정보리스트의 항목 체크해제시
    mapInfoGrid.on("uncheck",function(event) {
        var gridCheckedArr = mapInfoGrid.getCheckedRowKeys();
        var gridChecked = "";
        
        for (var i=0; i<gridCheckedArr.length; i++) {
            if (gridChecked != "") gridChecked += ",";
            gridChecked += gridCheckedArr[i];
        }
        
        mapInfoGrid.removeRowClassName(event.rowKey,"grid-label00");
        
        $("#map-info-grid-area .tui-grid-body-area").attr("grid-selected",gridChecked);
        
        //항목을 1개이상 선택했을 경우 선택해제/위치확인/대장보기 버튼 활성화
        if (gridCheckedArr.length > 0) {
            $(mapLayerObj).find(".clear-btn").prop("disabled",false);
            $(mapLayerObj).find(".position-btn").prop("disabled",false);
            $(mapLayerObj).find(".detail-btn").prop("disabled",false);
            
            //20220712 수정부분 start
            $(mapLayerObj).find(".selected-btn").prop("disabled",false);
            $(mapLayerObj).find(".convert-btn").prop("disabled",false);
            $(mapLayerObj).find(".sms-btn").prop("disabled",false);
            //20220712 수정부분 end
            
            //20220719 수정부분 start
            $(mapLayerObj).find(".connect-btn").prop("disabled",false);
            //20220719 수정부분 end
        } else {
            $(mapLayerObj).find(".clear-btn").prop("disabled",true);
            $(mapLayerObj).find(".position-btn").prop("disabled",true);
            $(mapLayerObj).find(".detail-btn").prop("disabled",true);
            
            //20220712 수정부분 start
            $(mapLayerObj).find(".selected-btn").prop("disabled",true);
            $(mapLayerObj).find(".convert-btn").prop("disabled",true);
            $(mapLayerObj).find(".sms-btn").prop("disabled",true);
            //20220712 수정부분 end
            
            //20220719 수정부분 start
            $(mapLayerObj).find(".connect-btn").prop("disabled",true);
            //20220719 수정부분 end
        }
    });
    
    //정보리스트의 항목 클릭시
    mapInfoGrid.on("click", function(event) {
        if (event.rowKey != undefined && event.columnName != "_checked") {      
            var gridCheckedArr = mapInfoGrid.getCheckedRowKeys();
            
            if (gridCheckedArr.indexOf(event.rowKey) > -1) {
                mapInfoGrid.uncheck(event.rowKey);
            } else {
                mapInfoGrid.check(event.rowKey);
                
            }
        }
    });
}

//관망도조회 단수분석 그리드 그리기
function setMapWatercutGrid(obj,mapLayerType) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var mapTopTab = mapLayerType.replace("waterCut","mapTopTab");
    
    if ($("#mapWatercutGrid").length > 0) {
        $("#mapWatercutGrid").remove();
    }
    
    //그리드 그리기
    $(mapLayerObj).find("#" + mapTopTab).find("#map-watercut-grid-area").append("<div id='mapWatercutGrid' class='dynamicGrid'></div>");

    var gridBodyHeight3 = 'auto';
    var gridData3 = [];
    var gridColumns3 = [];
    var gridHeader3 = {};
    var hdComplexColumns3 = [];
    var gridSummary3 = {};
    var smColumnContent3 = {};
    
    //summary 설정
    gridSummary3.height = 40;
    gridSummary3.position = 'bottom';

    //그리드 body 높이 설정
    gridBodyHeight3 = (winWidth < 576) ? (winHeight - 388) : (winHeight - 447);
    //그리드 body 최대높이 설정
    gridBodyHeight3 = (gridBodyHeight3 > 217) ? 217 : gridBodyHeight3;
    
    //20220803 수정부분 start
    if ($(mapLayerObj).attr("data-resize-flag") == "Y") {
        $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-toptab-con").each(function() {
            var gridListHeight3 = $(this).find(".map-list-area").height();
            
            if (gridListHeight3 > 0) {
                gridBodyHeight3 = gridListHeight3 - 82;
            }
        });
    }
    //20220803 수정부분 end
    
    if (mapLayerType == "waterCut01") {
        //단수수용가 목록
        //데이터 가져오기
        for (var i=0; i<3; i++) {
            gridData3.push({column00:i,column01:'012' + i,column02:'수용가명' + i,column03:'인천광역시...',column04:'',_attributes:{}});
        }

        //전체 항목 가져오기
        gridColumns3.push({header:'연번',name:'column00',minWidth: '70',whiteSpace: ''});
        gridColumns3.push({header:'수용가번호',name:'column01',minWidth: '70',whiteSpace: ''});
        gridColumns3.push({header:'수용가명',name:'column02',minWidth: '70',whiteSpace: ''});
        gridColumns3.push({header:'주소',name:'column03',minWidth: '110',whiteSpace: ''});
        gridColumns3.push({header:'상세주소',name:'column04',minWidth: '110',whiteSpace: ''});
        
        //summary 가져오기
        smColumnContent3.column00 = {template(summary) { return '<ul class="grid-summary-list"><li>합계</li></ul>'; }};
        smColumnContent3.column04 = {template(summary) { return '<ul class="grid-summary-list"><li>3개소</li></ul>'; }};
    } else if (mapLayerType == "waterCut02") {
        //단수제수변 목록
        //데이터 가져오기
        for (var i=0; i<3; i++) {
            gridData3.push({column00:i,column01:'3302' + i,_attributes:{}});
        }

        //전체 항목 가져오기
        gridColumns3.push({header:'연번',name:'column00',minWidth: '110',whiteSpace: ''});
        gridColumns3.push({header:'제수변 FTR_IDN',name:'column01',minWidth: '110',whiteSpace: ''});
        
        //summary 가져오기
        smColumnContent3.column00 = {template(summary) { return '<ul class="grid-summary-list"><li>합계</li></ul>'; }};
        smColumnContent3.column01 = {template(summary) { return '<ul class="grid-summary-list"><li>3개</li></ul>'; }};
    } else if (mapLayerType == "waterCut03") {
        //단수상수관 목록
        //데이터 가져오기
        for (var i=0; i<3; i++) {
            gridData3.push({column00:i,column01:'13759' + i,_attributes:{}});
        }

        //전체 항목 가져오기
        gridColumns3.push({header:'연번',name:'column00',minWidth: '110',whiteSpace: ''});
        gridColumns3.push({header:'상수관 FTR_IDN',name:'column01',minWidth: '110',whiteSpace: ''});
        
        //summary 가져오기
        smColumnContent3.column00 = {template(summary) { return '<ul class="grid-summary-list"><li>합계</li></ul>'; }};
        smColumnContent3.column01 = {template(summary) { return '<ul class="grid-summary-list"><li>0.0000㎞</li></ul>'; }};
    }
    
    gridSummary3.columnContent = smColumnContent3;

    mapWatercutGrid = new tui.Grid({
        el: document.getElementById('mapWatercutGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight3,
        minBodyHeight: 137,
        data: gridData3,
        columns: gridColumns3,
        header: gridHeader3,
        summary: gridSummary3,
        showDummyRows: true,
        columnOptions: {
            resizable: true
        }
    });
    
    //20220803 수정부분 start
    //리사이즈시
    $(window).resize(function() {
        //레이어 팝업 내용이 보일 경우에만 리사이즈시 그리드 새로고침
        if (!$(mapLayerObj).hasClass("hide")) {
            $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find("#" + mapTopTab + ".on").each(function() {
                var gridListHeight3 = $(this).find(".map-list-area").height();
                var gridListBodyHeight3 = $(this).find("#map-watercut-grid-area").find(".tui-grid-body-area").innerHeight();
                var gridReBodyHeight3 = gridListHeight3 - 82;

                if (parseInt(gridReBodyHeight3) != gridListBodyHeight3) {
                    mapWatercutGrid.setBodyHeight(gridReBodyHeight3);
                }

                mapWatercutGrid.refreshLayout();
            });
        }
    });
    
    $(mapLayerObj).resize(function() {
        $(this).find(".map-layer-box").find(".map-layer-con-area").find("#" + mapTopTab + ".on").each(function() {
            var gridListHeight3 = $(this).find(".map-list-area").height();
            var gridReBodyHeight3 = gridListHeight3 - 82;

            mapWatercutGrid.setBodyHeight(gridReBodyHeight3);

            mapWatercutGrid.refreshLayout();
        });
    });
    
    //레이어 팝업 내용 보이기 버튼 클릭시 그리드 새로고침
    $(mapLayerObj).find(".map-layer-box").find(".map-layer-tit-area").find(".map-layer-tit-btn").find(".map-show-btn").click(function() {
        if (!$(mapLayerObj).hasClass("hide")) {
            $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find("#" + mapTopTab + ".on").each(function() {
                var gridListHeight3 = $(this).find(".map-list-area").height();
                var gridReBodyHeight3 = gridListHeight3 - 82;

                mapWatercutGrid.setBodyHeight(gridReBodyHeight3);

                mapWatercutGrid.refreshLayout();
            });
        }
    });
    //20220803 수정부분 end
}

//20220719 수정부분 start
//관망도조회 수용가정보 그리드 그리기
function setMapWatersupplyGrid(obj,mapLayerType) {
    var mapLayerObj = $(obj).closest(".map-layer-wrap");
    var mapTopTab = mapLayerType.replace("waterSupply","mapTopTab");
    
    if ($("#mapWatersupplyGrid").length > 0) {
        $("#mapWatersupplyGrid").remove();
    }
    
    //그리드 그리기
    $(mapLayerObj).find("#" + mapTopTab).find("#map-watersupply-grid-area").append("<div id='mapWatersupplyGrid' class='dynamicGrid'></div>");

    var gridBodyHeight4 = 'auto';
    var gridData4 = [];
    var gridColumns4 = [];
    var gridHeader4 = {};
    var hdComplexColumns4 = [];
    var gridSummary4 = {};
    var smColumnContent4 = {};
    
    //그리드 body 높이 설정
    gridBodyHeight4 = (winWidth < 576) ? (winHeight - 304) : (winHeight - 357);
    //그리드 body 최대높이 설정
    gridBodyHeight4 = (gridBodyHeight4 > 217) ? 217 : gridBodyHeight4;    
    
    //20220803 수정부분 start
    if ($(mapLayerObj).attr("data-resize-flag") == "Y") {
        $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find(".map-toptab-con").each(function() {
            var gridListHeight4 = $(this).find(".map-list-area").height();
            
            if (gridListHeight4 > 0) {
                gridBodyHeight4 = gridListHeight4 - 42;
            }
        });
    }
    //20220803 수정부분 end
    
    if (mapLayerType == "waterSupply01") {
        //지역별 수도전수 목록
        //데이터 가져오기
        gridData4.push({column00:'합계',column01:'6,855',column02:'6,861',column03:'-6',_attributes:{}});

        //전체 항목 가져오기
        gridColumns4.push({header:'지역',name:'column00',minWidth: '70',whiteSpace: ''});
        gridColumns4.push({header:'수용가',name:'column01',minWidth: '70',whiteSpace: ''});
        gridColumns4.push({header:'GIS',name:'column02',minWidth: '70',whiteSpace: ''});
        gridColumns4.push({header:'차이',name:'column03',minWidth: '70',whiteSpace: ''});
    } else if (mapLayerType == "waterSupply02") {
        //블록별 수도전수 목록
        //데이터 가져오기
        gridData4.push({column00:'103',column01:'1,102',column02:'1,102',column03:'0',_attributes:{}});
        gridData4.push({column00:'합계',column01:'1,102',column02:'1,102',column03:'0',_attributes:{}});

        //전체 항목 가져오기
        gridColumns4.push({header:'블록번호',name:'column00',minWidth: '70',whiteSpace: ''});
        gridColumns4.push({header:'수용가',name:'column01',minWidth: '70',whiteSpace: ''});
        gridColumns4.push({header:'GIS',name:'column02',minWidth: '70',whiteSpace: ''});
        gridColumns4.push({header:'차이',name:'column03',minWidth: '70',whiteSpace: ''});
    } else if (mapLayerType == "waterSupply03") {
        //신설 및 폐전 목록
        //데이터 가져오기
        for (var i=0; i<10; i++) {
            gridData4.push({column00:'신설',column01:'3345',column02:'용현1·4동',column03:'39-12',column04:'2022-06-01',column05:'',_attributes:{}});
        }

        //전체 항목 가져오기
        gridColumns4.push({header:'구분',name:'column00',minWidth: '70',whiteSpace: ''});
        gridColumns4.push({header:'수전번호',name:'column01',minWidth: '70',whiteSpace: ''});
        gridColumns4.push({header:'행정동',name:'column02',minWidth: '110',whiteSpace: ''});
        gridColumns4.push({header:'지번',name:'column03',minWidth: '110',whiteSpace: ''});
        gridColumns4.push({header:'신설등록일자',name:'column04',minWidth: '110',whiteSpace: ''});
        gridColumns4.push({header:'폐전일자',name:'column05',minWidth: '110',whiteSpace: ''});
    }

    mapWatersupplyGrid = new tui.Grid({
        el: document.getElementById('mapWatersupplyGrid'),
        scrollX: true,
        scrollY: true,
        rowHeight: 'auto',
        bodyHeight: gridBodyHeight4,
        minBodyHeight: 137,
        data: gridData4,
        columns: gridColumns4,
        header: gridHeader4,
        summary: gridSummary4,
        showDummyRows: true,
        columnOptions: {
            resizable: true
        }
    });
    
    //20220803 수정부분 start
    //리사이즈시
    $(window).resize(function() {
        //레이어 팝업 내용이 보일 경우에만 리사이즈시 그리드 새로고침
        if (!$(mapLayerObj).hasClass("hide")) {
            $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find("#" + mapTopTab + ".on").each(function() {
                var gridListHeight4 = $(this).find(".map-list-area").height();
                var gridListBodyHeight4 = $(this).find("#map-watersupply-grid-area").find(".tui-grid-body-area").innerHeight();
                var gridReBodyHeight4 = gridListHeight4 - 42;

                if (parseInt(gridReBodyHeight4) != gridListBodyHeight4) {
                    mapWatersupplyGrid.setBodyHeight(gridReBodyHeight4);
                }

                mapWatersupplyGrid.refreshLayout();
            });
        }
    });
    
    $(mapLayerObj).resize(function() {
        $(this).find(".map-layer-box").find(".map-layer-con-area").find("#" + mapTopTab + ".on").each(function() {
            var gridListHeight4 = $(this).find(".map-list-area").height();
            var gridReBodyHeight4 = gridListHeight4 - 42;

            mapWatersupplyGrid.setBodyHeight(gridReBodyHeight4);

            mapWatersupplyGrid.refreshLayout();
        });
    });
    
    //레이어 팝업 내용 보이기 버튼 클릭시 그리드 새로고침
    $(mapLayerObj).find(".map-layer-box").find(".map-layer-tit-area").find(".map-layer-tit-btn").find(".map-show-btn").click(function() {
        if (!$(mapLayerObj).hasClass("hide")) {
            $(mapLayerObj).find(".map-layer-box").find(".map-layer-con-area").find("#" + mapTopTab + ".on").each(function() {
                var gridListHeight4 = $(this).find(".map-list-area").height();
                var gridReBodyHeight4 = gridListHeight4 - 42;

                mapWatersupplyGrid.setBodyHeight(gridReBodyHeight4);

                mapWatersupplyGrid.refreshLayout();
            });
        }
    });
    //20220803 수정부분 end
}
//20220719 수정부분 end

//관망도조회 레이어 팝업 열기
function openMapLayer(obj,mapLayerType) {
    var mapLayerId = "";
    var mapLayerTit = "";
    var mapLayerHtml = "";
    
    //20220713 수정부분 start
    var mapLayerName = "";
    //20220713 수정부분 end
    
    //정보상세창에서 사용함
    var dataDetailIdx = $(obj).attr("data-detail-idx");
    
    if (dataDetailIdx == undefined) {
        dataDetailIdx = "";
    }   
    
    if (mapLayerType == "search") {
        mapLayerId = "map-layer00";
        mapLayerTit = "검색";
        
        mapLayerHtml += "<div class='map-search-area'>";
        mapLayerHtml += "    <div class='map-search-box'>";
        mapLayerHtml += "        <div class='map-search-select'></div>";
        mapLayerHtml += "        <input type='text' id='' name='' class='map-search-input' placeholder='검색어'>";
        mapLayerHtml += "        <input type='button' value='검색' class='map-search-btn'>";
        mapLayerHtml += "    </div>";

        //map-search-select-list : 셀렉트박스 눌렀을 때 노출
        mapLayerHtml += "    <ul class='map-search-select-list'>";
        
        //20220926 수정부분 start
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect00' name='mapSearchSelect' value='전체'>";
        mapLayerHtml += "            <label for='mapSearchSelect00'>전체</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect01' name='mapSearchSelect' value='고객번호'>";
        mapLayerHtml += "            <label for='mapSearchSelect01'>고객번호</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect02' name='mapSearchSelect' value='블록번호'>";
        mapLayerHtml += "            <label for='mapSearchSelect02'>블록번호</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect03' name='mapSearchSelect' value='계측기번호'>";
        mapLayerHtml += "            <label for='mapSearchSelect03'>계측기번호</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect04' name='mapSearchSelect' value='도엽번호'>";
        mapLayerHtml += "            <label for='mapSearchSelect04'>도엽번호</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect05' name='mapSearchSelect' value='수전번호'>";
        mapLayerHtml += "            <label for='mapSearchSelect05'>수전번호</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect06' name='mapSearchSelect' value='배수지명'>";
        mapLayerHtml += "            <label for='mapSearchSelect06'>배수지명</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect07' name='mapSearchSelect' value='가압장명'>";
        mapLayerHtml += "            <label for='mapSearchSelect07'>가압장명</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect08' name='mapSearchSelect' value='블록명'>";
        mapLayerHtml += "            <label for='mapSearchSelect08'>블록명</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect09' name='mapSearchSelect' value='인천주소'>";
        mapLayerHtml += "            <label for='mapSearchSelect09'>인천주소</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect10' name='mapSearchSelect' value='지번주소'>";
        mapLayerHtml += "            <label for='mapSearchSelect10'>지번주소</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect11' name='mapSearchSelect' value='도로명주소'>";
        mapLayerHtml += "            <label for='mapSearchSelect11'>도로명주소</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchSelect12' name='mapSearchSelect' value='건물명주소'>";
        mapLayerHtml += "            <label for='mapSearchSelect12'>건물명주소</label>";
        mapLayerHtml += "        </li>";
        //20220926 수정부분 end
        
        mapLayerHtml += "    </ul>";

        //map-search-input-list : 텍스트박스 입력했을 때 노출
        mapLayerHtml += "    <ul class='map-search-input-list'>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchInput00' name='mapSearchInput'>";
        mapLayerHtml += "            <label for='mapSearchInput00'>141</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchInput01' name='mapSearchInput'>";
        mapLayerHtml += "            <label for='mapSearchInput01'>125</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchInput02' name='mapSearchInput'>";
        mapLayerHtml += "            <label for='mapSearchInput02'>421</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchInput03' name='mapSearchInput'>";
        mapLayerHtml += "            <label for='mapSearchInput03'>134</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <input type='radio' id='mapSearchInput04' name='mapSearchInput'>";
        mapLayerHtml += "            <label for='mapSearchInput04'>138</label>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        
        //20220926 수정부분 start
        //map-search-address-form : 지번주소 선택했을 때 노출
        mapLayerHtml += "    <div class='c-input-area map-search-address-form'>";
        
        //address-form-item1 : 지번주소 등록구 항목
        mapLayerHtml += "        <div class='c-input address-form-item1'>";
        mapLayerHtml += "            <div class='c-input-tit'>등록구</div>";
        mapLayerHtml += "            <div class='c-input-con'>";
        mapLayerHtml += "                <select id='' name='' onchange='selMapAddress(this,\"address1\");'>";
        mapLayerHtml += "                    <option value=''>선택</option>";
        mapLayerHtml += "                    <option value='강화군'>강화군</option>";
        mapLayerHtml += "                    <option value='계양구'>계양구</option>";
        mapLayerHtml += "                    <option value='남동구'>남동구</option>";
        mapLayerHtml += "                    <option value='동구'>동구</option>";
        mapLayerHtml += "                    <option value='미추홀구'>미추홀구</option>";
        mapLayerHtml += "                    <option value='부평구'>부평구</option>";
        mapLayerHtml += "                    <option value='서구'>서구</option>";
        mapLayerHtml += "                    <option value='연수구'>연수구</option>";
        mapLayerHtml += "                    <option value='옹진군'>옹진군</option>";
        mapLayerHtml += "                    <option value='중구'>중구</option>";
        mapLayerHtml += "                </select>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        
        //address-form-item2 : 지번주소 읍/면/동 항목
        mapLayerHtml += "        <div class='c-input address-form-item2'>";
        mapLayerHtml += "            <div class='c-input-tit'>읍/면/동</div>";
        mapLayerHtml += "            <div class='c-input-con'>";
        mapLayerHtml += "                <select id='' name='' onchange='selMapAddress(this,\"address2\");'>";
        mapLayerHtml += "                    <option value=''>선택</option>";
        mapLayerHtml += "                </select>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        
        //address-form-item3 : 지번주소 리 항목
        mapLayerHtml += "        <div class='c-input address-form-item3'>";
        mapLayerHtml += "            <div class='c-input-tit'>리</div>";
        mapLayerHtml += "            <div class='c-input-con'>";
        mapLayerHtml += "                <select id='' name=''>";
        mapLayerHtml += "                    <option value=''>선택</option>";
        mapLayerHtml += "                </select>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='c-input'>";
        mapLayerHtml += "            <div class='c-input-tit'>산</div>";
        mapLayerHtml += "            <div class='c-input-con'>";
        mapLayerHtml += "                <div class='only-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='addressCheck00' name=''>";
        mapLayerHtml += "                    <label for='addressCheck00'></label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='c-input'>";
        mapLayerHtml += "            <div class='c-input-tit'>지번</div>";
        mapLayerHtml += "            <div class='c-input-con'>";
        mapLayerHtml += "                <input type='text' id='' name='' class='half-input'>";
        mapLayerHtml += "                <span class='separate'>-</span>";
        mapLayerHtml += "                <input type='text' id='' name='' class='half-input'>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='c-input c-input-btn'>";
        mapLayerHtml += "            <button type='button' onclick='setMapAddressClear(this);'>";
        mapLayerHtml += "                <span>해제</span>";
        mapLayerHtml += "            </button>";
        mapLayerHtml += "            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                <span>검색</span>";
        mapLayerHtml += "            </button>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        
        //map-search-building-form : 건물명주소 선택했을 때 노출
        mapLayerHtml += "    <div class='c-input-area map-search-building-form'>";
        
        //building-form-item1 : 건물명주소 검색범위 항목
        mapLayerHtml += "        <div class='c-input building-form-item1'>";
        mapLayerHtml += "            <div class='c-input-tit'>검색범위</div>";
        mapLayerHtml += "            <div class='c-input-con'>";
        mapLayerHtml += "                <select id='' name=''>";
        mapLayerHtml += "                    <option value=''>인천광역시</option>";
        mapLayerHtml += "                    <option value='강화군'>강화군</option>";
        mapLayerHtml += "                    <option value='계양구'>계양구</option>";
        mapLayerHtml += "                    <option value='남동구'>남동구</option>";
        mapLayerHtml += "                    <option value='동구'>동구</option>";
        mapLayerHtml += "                    <option value='미추홀구'>미추홀구</option>";
        mapLayerHtml += "                    <option value='부평구'>부평구</option>";
        mapLayerHtml += "                    <option value='서구'>서구</option>";
        mapLayerHtml += "                    <option value='연수구'>연수구</option>";
        mapLayerHtml += "                    <option value='옹진군'>옹진군</option>";
        mapLayerHtml += "                    <option value='중구'>중구</option>";
        mapLayerHtml += "                </select>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='c-input'>";
        mapLayerHtml += "            <div class='c-input-tit'>건물명</div>";
        mapLayerHtml += "            <div class='c-input-con'>";
        mapLayerHtml += "                <input type='text' id='' name=''>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='c-input c-input-btn'>";
        mapLayerHtml += "            <button type='button' onclick='setMapBuildingClear(this);'>";
        mapLayerHtml += "                <span>해제</span>";
        mapLayerHtml += "            </button>";
        mapLayerHtml += "            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                <span>검색</span>";
        mapLayerHtml += "            </button>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        //20220926 수정부분 end
        
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "layer") {
        mapLayerId = "map-layer00";
        mapLayerTit = "레이어";
        
        mapLayerHtml += "<div class='map-topbtn-area'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "    <button type='button' class='c-btn01' onclick='setMapLayerCheckAll(this,\"on\");'>";
        mapLayerHtml += "        <span><img class='svg' src='img/checkbox-marked-outline.svg' alt='전체체크'></span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "    <button type='button' class='c-btn01' onclick='setMapLayerCheckAll(this,\"off\");'>";
        mapLayerHtml += "        <span><img class='svg' src='img/checkbox-blank-outline.svg' alt='전체체크해제'></span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "    <button type='button' class='c-btn01 layer-setting-btn' onclick='openMapLayer(this,\"layerSetting\");'>";
        mapLayerHtml += "        <span>레이어 추가/제거</span>";
        mapLayerHtml += "    </button>";
        //20220713 수정부분 end
        
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-list-area map-layer-list-area'>";
        mapLayerHtml += "    <ul class='map-list'>";
        
        //parent : 하위 항목이 있을 경우 추가, checked: 체크했을 경우 추가
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem00' name=''>";
        mapLayerHtml += "                    <label for='layerItem00'>급수관로</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        
        //map-single-list : 동일한 뎁스의 항목에서 1개만 선택해야 하는 경우
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0000' name=''>";
        mapLayerHtml += "                            <label for='layerItem0000'>급수관로_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                            </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList08\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        
        //20220714 수정부분 start
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem12' name=''>";
        mapLayerHtml += "                    <label for='layerItem12'>급수구역</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem1200' name=''>";
        mapLayerHtml += "                            <label for='layerItem1200'>급수구역_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList12\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem1201' name=''>";
        mapLayerHtml += "                            <label for='layerItem1201'>급수구역_사업소별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList12\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem13' name=''>";
        mapLayerHtml += "                    <label for='layerItem13'>기타변류</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem1300' name=''>";
        mapLayerHtml += "                            <label for='layerItem1300'>변류별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem130000' name=''>";
        mapLayerHtml += "                                    <label for='layerItem130000'>역지변</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList13\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem130001' name=''>";
        mapLayerHtml += "                                    <label for='layerItem130001'>이토변</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList13\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem130002' name=''>";
        mapLayerHtml += "                                    <label for='layerItem130002'>공기변</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList13\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem130003' name=''>";
        mapLayerHtml += "                                    <label for='layerItem130003'>감압변</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList13\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem130004' name=''>";
        mapLayerHtml += "                                    <label for='layerItem130004'>안전변</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList13\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem1301' name=''>";
        mapLayerHtml += "                            <label for='layerItem1301'>변류형식</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem130100' name=''>";
        mapLayerHtml += "                                    <label for='layerItem130100'>기타변류_박스형</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList13\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem130101' name=''>";
        mapLayerHtml += "                                    <label for='layerItem130101'>기타변류_토류형</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList13\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        //20220714 수정부분 end
        
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem01' name=''>";
        mapLayerHtml += "                    <label for='layerItem01'>누수불출수지점</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0100' name=''>";
        mapLayerHtml += "                            <label for='layerItem0100'>누수불출수지점_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                            </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList09\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0101' name=''>";
        mapLayerHtml += "                            <label for='layerItem0101'>유형별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem010100' name=''>";
        mapLayerHtml += "                                    <label for='layerItem010100'>누수불출수지점_누수지점</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList09\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem010101' name=''>";
        mapLayerHtml += "                                    <label for='layerItem010101'>누수불출수지점_불출수지점</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList09\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem010102' name=''>";
        mapLayerHtml += "                                    <label for='layerItem010102'>누수불출수지점_소출수지점</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList09\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem010103' name=''>";
        mapLayerHtml += "                                    <label for='layerItem010103'>누수불출수지점_확인터파기</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList09\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0102' name=''>";
        mapLayerHtml += "                            <label for='layerItem0102'>공사상태</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem010200' name=''>";
        mapLayerHtml += "                                    <label for='layerItem010200'>누수불출수지점_공사중</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList09\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem010201' name=''>";
        mapLayerHtml += "                                    <label for='layerItem010201'>누수불출수지점_완료</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList09\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem02' name=''>";
        mapLayerHtml += "                    <label for='layerItem02'>맨홀</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem03' name=''>";
        mapLayerHtml += "                    <label for='layerItem03'>상수관로</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0300' name=''>";
        mapLayerHtml += "                            <label for='layerItem0300'>상수관로_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList04\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0301' name=''>";
        mapLayerHtml += "                            <label for='layerItem0301'>구경별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem030100' name=''>";
        mapLayerHtml += "                                    <label for='layerItem030100'>구경별_00</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList04\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem030101' name=''>";
        mapLayerHtml += "                                    <label for='layerItem030101'>구경별_01</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList04\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0302' name=''>";
        mapLayerHtml += "                            <label for='layerItem0302'>용도별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem030200' name=''>";
        mapLayerHtml += "                                    <label for='layerItem030200'>상수관로_도수관</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList04\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem030201' name=''>";
        mapLayerHtml += "                                    <label for='layerItem030201'>상수관로_송수관</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList04\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem030202' name=''>";
        mapLayerHtml += "                                    <label for='layerItem030202'>상수관로_배수관</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList04\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem04' name=''>";
        mapLayerHtml += "                    <label for='layerItem04'>상수관로심도</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList05\");'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        
        //20220714 수정부분 start
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem14' name=''>";
        mapLayerHtml += "                    <label for='layerItem14'>상수숨은관로</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList14\");'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem15' name=''>";
        mapLayerHtml += "                    <label for='layerItem15'>세척구</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList15\");'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        //20220714 수정부분 end
        
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem05' name=''>";
        mapLayerHtml += "                    <label for='layerItem05'>소화전</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0500' name=''>";
        mapLayerHtml += "                            <label for='layerItem0500'>소화전_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                            </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList10\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0501' name=''>";
        mapLayerHtml += "                            <label for='layerItem0501'>지상지하구분</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem050100' name=''>";
        mapLayerHtml += "                                    <label for='layerItem050100'>소화전_지상</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList10\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem050101' name=''>";
        mapLayerHtml += "                                    <label for='layerItem050101'>소화전_지하</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList10\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0502' name=''>";
        mapLayerHtml += "                            <label for='layerItem0502'>형식별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem050200' name=''>";
        mapLayerHtml += "                                    <label for='layerItem050200'>소화전_단구</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList10\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem050201' name=''>";
        mapLayerHtml += "                                    <label for='layerItem050201'>소화전_쌍구</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList10\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem050202' name=''>";
        mapLayerHtml += "                                    <label for='layerItem050202'>소화전_삼구</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList10\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0503' name=''>";
        mapLayerHtml += "                            <label for='layerItem0503'>정비필요</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem050300' name=''>";
        mapLayerHtml += "                                    <label for='layerItem050300'>소화전_소화전형식_NULL</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList10\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        //20220714 수정부분 end
        
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem06' name=''>";
        mapLayerHtml += "                    <label for='layerItem06'>수도전</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0600' name=''>";
        mapLayerHtml += "                            <label for='layerItem0600'>수도전_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-outline.svg' alt='필터'></span>";
        mapLayerHtml += "                            </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList11\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem07' name=''>";
        mapLayerHtml += "                    <label for='layerItem07'>수압측정지점</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0700' name=''>";
        mapLayerHtml += "                             <label for='layerItem0700'>수압측정지점_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList01\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem0701' name=''>";
        mapLayerHtml += "                            <label for='layerItem0701'>관경별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem070100' name=''>";
        mapLayerHtml += "                                    <label for='layerItem070100'>관경별_00</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList01\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem070101' name=''>";
        mapLayerHtml += "                                    <label for='layerItem070101'>관경별_01</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList01\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem08' name='' checked>";
        mapLayerHtml += "                    <label for='layerItem08'>수위측정지점</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList03\");'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem09' name='' checked>";
        mapLayerHtml += "                    <label for='layerItem09'>수질측정지점</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label.svg' alt='주석숨기기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList02\");'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem10' name=''>";
        mapLayerHtml += "                    <label for='layerItem10'>유량계</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem1000' name=''>";
        mapLayerHtml += "                            <label for='layerItem1000'>유량계_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList00\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem1001' name=''>";
        mapLayerHtml += "                            <label for='layerItem1001'>관경별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem100100' name=''>";
        mapLayerHtml += "                                    <label for='layerItem100100'>관경별_00</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList00\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem100101' name=''>";
        mapLayerHtml += "                                    <label for='layerItem100101'>관경별_01</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList00\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        
        //20220714 수정부분 start
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem16' name=''>";
        mapLayerHtml += "                    <label for='layerItem16'>저수조</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList16\");'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem17' name=''>";
        mapLayerHtml += "                    <label for='layerItem17'>정수장</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList17\");'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        //20220714 수정부분 end
        
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem11' name=''>";
        mapLayerHtml += "                    <label for='layerItem11'>제수변</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list map-single-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem1100' name=''>";
        mapLayerHtml += "                            <label for='layerItem1100'>제수변_전체</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList06\");'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                            </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                            </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li class='parent'>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='layerItem1101' name=''>";
        mapLayerHtml += "                            <label for='layerItem1101'>역할별</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <ul class='map-list'>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem110100' name=''>";
        mapLayerHtml += "                                    <label for='layerItem110100'>제수변_경계변</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList06\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem110101' name=''>";
        mapLayerHtml += "                                    <label for='layerItem110101'>제수변_일반제수변</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList06\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem110102' name=''>";
        mapLayerHtml += "                                    <label for='layerItem110102'>제수변_지수변</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList06\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem110103' name=''>";
        mapLayerHtml += "                                    <label for='layerItem110103'>제수변_소화전용</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList06\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                        <li>";
        mapLayerHtml += "                            <div class='map-list-tit'>";
        mapLayerHtml += "                                <div class='map-list-check'>";
        mapLayerHtml += "                                    <input type='checkbox' id='layerItem110104' name=''>";
        mapLayerHtml += "                                    <label for='layerItem110104'>제수변_자동드레인</label>";
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                                <div class='map-list-view'>";
        
        //20220713 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                                    </button>";
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList07\");'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                                    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "                                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                                    </button>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "                                </div>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                        </li>";
        mapLayerHtml += "                    </ul>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        
        //20220719 수정부분 start
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='layerItem18' name=''>";
        mapLayerHtml += "                    <label for='layerItem18'>RFID태그</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-list-view'>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/label-outline.svg' alt='주석보이기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "                        <span><img class='svg' src='img/filter-remove.svg' alt='필터해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayer(this,\"ledgerList18\");'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/table-large.svg' alt='대장리스트보기'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='openMapLayerinfoLayer(this);'>";
        mapLayerHtml += "                        <span><img class='svg' src='img/settings-outline.svg' alt='레이어설정'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        //20220719 수정부분 end
        
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "waterWay") {
        mapLayerId = "map-layer00";
        mapLayerTit = "물방향";
        
        mapLayerHtml += "<div class='map-list-area map-waterway-list-area'>";
        mapLayerHtml += "    <ul class='map-list'>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='waterwayItem00' name=''>";
        mapLayerHtml += "                    <label for='waterwayItem00'>송수관</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        
        //parent : 하위 레이어가 있을 경우 추가
        mapLayerHtml += "        <li class='parent'>";
        mapLayerHtml += "            <div class='map-list-tit'>";
        mapLayerHtml += "                <div class='map-list-check'>";
        mapLayerHtml += "                    <input type='checkbox' id='waterwayItem01' name=''>";
        mapLayerHtml += "                    <label for='waterwayItem01'>배수관</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='waterwayItem0100' name=''>";
        mapLayerHtml += "                            <label for='waterwayItem0100'>구경 100 미만</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='waterwayItem0101' name=''>";
        mapLayerHtml += "                            <label for='waterwayItem0101'>구경 100 ~ 200</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='waterwayItem0102' name=''>";
        mapLayerHtml += "                            <label for='waterwayItem0102'>구경 200 ~ 350</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-list-tit'>";
        mapLayerHtml += "                        <div class='map-list-check'>";
        mapLayerHtml += "                            <input type='checkbox' id='waterwayItem0103' name=''>";
        mapLayerHtml += "                            <label for='waterwayItem0103'>구경 350 초과</label>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType.indexOf("ledgerList") > -1) {
        var mapSearchLayerHtml = "";
        mapLayerId = "map-layer01";
        
        //20220712 수정부분 start
        if (mapLayerType == "ledgerList00") {
            mapLayerTit = "유량계_전체 검색결과";
            
            //20220713 수정부분 start
            mapLayerName = "유량계_전체";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>행정읍면동코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>유량계형식</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList01") {
            mapLayerTit = "수압측정지점_전체 검색결과";
            
            //20220713 수정부분 start
            mapLayerName = "수압측정지점_전체";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>등록구</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList02") {
            mapLayerTit = "수질측정지점 검색결과";
            
            //20220713 수정부분 start
            mapLayerName = "수질측정지점";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>등록구</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList03") {
            mapLayerTit = "수위측정지점 검색결과";
            
            //20220713 수정부분 start
            mapLayerName = "수위측정지점";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>등록구</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList04") {
            mapLayerTit = "상수관로_전체 검색결과";
            
            //20220713 수정부분 start
            mapLayerName = "상수관로_전체";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>등록구</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>사업소</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>공사번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='공사번호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList05") {
            mapLayerTit = "상수관로심도 검색결과";
            
            //20220713 수정부분 start
            mapLayerName = "상수관로심도";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='관리기관'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='관리번호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>블록</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='블록'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList06") {
            mapLayerTit = "제수변_전체 검색결과";
            
            //20220713 수정부분 start
            mapLayerName = "제수변_전체";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>행정읍면동코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>변류형식</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList07") {
            mapLayerTit = "제수변_자동드레인 검색결과";
            
            //20220713 수정부분 start
            mapLayerName = "제수변_자동드레인";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>행정읍면동코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>변류형식</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            
        //20220714 수정부분 start
        } else if (mapLayerType == "ledgerList08") {
            mapLayerTit = "급수관로_전체 검색결과";
            mapLayerName = "급수관로_전체";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>사업소</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관재질</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList09") {
            mapLayerTit = "누수불출수지점_전체 검색결과";
            mapLayerName = "누수불출수지점_전체";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>지형지물부호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>누수원인</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList10") {
            mapLayerTit = "소화전_전체 검색결과";
            mapLayerName = "소화전_전체";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>행정읍면동</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>소화전형식</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList11") {
            mapLayerTit = "수도전_전체 검색결과";
            mapLayerName = "수도전_전체";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>블록코드</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>수용가번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList12") {
            mapLayerTit = "급수구역_전체 검색결과";
            mapLayerName = "급수구역_전체";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>급수구역명</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='급수구역명'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList13") {
            mapLayerTit = "역지변 검색결과";
            mapLayerName = "역지변";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>행정읍면동</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>변류형식</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList14") {
            mapLayerTit = "상수숨은관로 검색결과";
            mapLayerName = "상수숨은관로";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>설치일자</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>블록</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList15") {
            mapLayerTit = "세척구 검색결과";
            mapLayerName = "세척구";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>행정읍면동</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>절개형태</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList16") {
            mapLayerTit = "저수조 검색결과";
            mapLayerName = "저수조";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>등록구</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>도엽번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>개별번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='개별번호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList17") {
            mapLayerTit = "정수장 검색결과";
            mapLayerName = "정수장";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>행정읍면동</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>정수장명</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='정수장명'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            
        //20220719 수정부분 start
        } else if (mapLayerType == "ledgerList18") {
            mapLayerTit = "RFID태그 검색결과";
            mapLayerName = "RFID태그";
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>사업소</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>블록</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='블록'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "ledgerList19") {
            mapLayerTit = "RFID테이블 검색결과";
            mapLayerName = "RFID테이블";
        }
        //20220719 수정부분 end
        //20220714 수정부분 end
        
        //20220719 수정부분 start (아래 조건문에서 else문 안의 내용은 수정부분 없음)
        if (mapLayerType == "ledgerList19") {
            mapLayerHtml += "<div class='map-topbtn-area'>";
            
            //20220720 수정부분 start
            mapLayerHtml += "    <button type='button' class='c-btn01 search-btn' title='속성검색' onclick='openSqlSearchLayer(this);'>";
            //20220720 수정부분 end
            
            mapLayerHtml += "        <span><img class='svg' src='img/magnify.svg' alt='속성검색'></span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='c-btn01 reload-btn' title='새로고침' onclick='setMapLedgerGrid(this,\"" + mapLayerType + "\")'>";
            mapLayerHtml += "        <span><img class='svg' src='img/reload.svg' alt='새로고침'></span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='c-btn01 clear-btn' disabled title='선택해제' onclick='setMapListClear(this,\"" + mapLayerType + "\");'>";
            mapLayerHtml += "        <span><img class='svg' src='img/selection-off.svg' alt='선택해제'></span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='c-btn01 position-btn' disabled title='위치확인' onclick=''>";
            mapLayerHtml += "        <span><img class='svg' src='img/map-marker-radius.svg' alt='위치확인'></span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='c-btn01 connect-btn' disabled title='RFID리더기 연결' onclick='setMapRfidConnect(this);'>";
            mapLayerHtml += "        <span><img class='svg' src='img/bluetooth.svg' alt='RFID리더기 연결'></span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='c-btn01 detail-btn' disabled title='대장보기' onclick='openMapLayer(this,\"" + (mapLayerType.replace("ledgerList","ledgerDetail")) + "\");'>";
            mapLayerHtml += "        <span><img class='svg' src='img/library-books.svg' alt='대장보기'></span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "</div>";
            mapLayerHtml += "<div class='map-list-area map-ledger-list-area'>";

            //dynamic-grid-area : 동적 그리드 그리기
            mapLayerHtml += "    <div class='dynamic-grid-area' id='map-ledger-grid-area'></div>";
            mapLayerHtml += "    <ul class='map-list-result'>";
            mapLayerHtml += "        <li class='map-pc-item'>레이어 <span id=''>" + mapLayerName + "</span></li>";
            mapLayerHtml += "        <li>전체 항목수 <span id=''>66,980</span></li>";
            mapLayerHtml += "        <li class='map-pc-item'>검색조건 <span id=''>전체</span></li>";
            mapLayerHtml += "        <li>검색결과 항목수 <span id=''>66,980</span></li>";
            mapLayerHtml += "        <li class='map-pc-item'>선택한 항목수 <span id=''>1</span></li>";
            mapLayerHtml += "    </ul>";
            mapLayerHtml += "</div>";
        } else {
            mapLayerHtml += "<div class='map-topbtn-area'>";
            mapLayerHtml += "    <button type='button' class='search-btn' onclick='setMapListSearch(this);'>";
            mapLayerHtml += "        <span>속성검색</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='reload-btn' onclick='setMapLedgerGrid(this,\"" + mapLayerType + "\")'>";
            mapLayerHtml += "        <span>새로고침</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='clear-btn' disabled onclick='setMapListClear(this,\"" + mapLayerType + "\");'>";
            mapLayerHtml += "        <span>선택해제</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='position-btn' disabled onclick=''>";
            mapLayerHtml += "        <span>위치확인</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='selected-btn map-pc-item' disabled onclick=''>";
            mapLayerHtml += "        <span>선택한 항목만</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='detail-btn' disabled onclick='openMapLayer(this,\"" + (mapLayerType.replace("ledgerList","ledgerDetail")) + "\");'>";
            mapLayerHtml += "        <span>대장보기</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='convert-btn map-pc-item' disabled onclick=''>";
            mapLayerHtml += "        <span>도형으로 변환</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='shp-btn map-pc-item' onclick=''>";
            mapLayerHtml += "        <span>SHP파일로 다운로드</span>";
            mapLayerHtml += "    </button>";

            //20220714 수정부분 start
            mapLayerHtml += "    <button type='button' class='csv-btn map-pc-item' onclick='getDynamicGridCsv(\"mapLedgerGrid\");'>";
            mapLayerHtml += "        <span>CSV파일로 다운로드</span>";
            mapLayerHtml += "    </button>";
            //20220714 수정부분 end

            mapLayerHtml += "    <button type='button' class='sms-btn map-pc-item' disabled onclick=''>";
            mapLayerHtml += "        <span>SMS</span>";
            mapLayerHtml += "    </button>";

            //20220713 수정부분 start
            mapLayerHtml += "    <button type='button' class='c-btn01 field-btn map-pc-item' onclick=''>";
            mapLayerHtml += "        <span><img class='svg' src='img/view-column.svg' alt='필드목록'></span>";
            mapLayerHtml += "    </button>";
            //20220713 수정부분 end

            mapLayerHtml += "</div>";
            mapLayerHtml += "<div class='map-topsearch-area'>";
            mapLayerHtml += "    <ul class='map-topsearch-list'>";
            mapLayerHtml += mapSearchLayerHtml;
            mapLayerHtml += "    </ul>";
            mapLayerHtml += "    <button type='button' class='c-btn01 detail-search-btn map-pc-item' onclick=''>";
            mapLayerHtml += "        <span>상세검색</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='c-btn01 quick-search-btn map-pc-item' onclick='setMapListSearchResult(this,\"" + mapLayerType + "\")'>";
            mapLayerHtml += "        <span>빠른검색</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "    <button type='button' class='c-btn01 map-mobile-item' onclick='setMapListSearchResult(this,\"" + mapLayerType + "\")'>";
            mapLayerHtml += "        <span>검색</span>";
            mapLayerHtml += "    </button>";
            mapLayerHtml += "</div>";
            mapLayerHtml += "<div class='map-list-area map-ledger-list-area'>";

            //dynamic-grid-area : 동적 그리드 그리기
            mapLayerHtml += "    <div class='dynamic-grid-area' id='map-ledger-grid-area'></div>";

            //20220713 수정부분 start
            //20220714 수정부분 start
            mapLayerHtml += "    <ul class='map-list-result'>";
            mapLayerHtml += "        <li class='map-pc-item'>레이어 <span id=''>" + mapLayerName + "</span></li>";
            mapLayerHtml += "        <li>전체 항목수 <span id=''>66,980</span></li>";
            mapLayerHtml += "        <li class='map-pc-item'>검색조건 <span id=''>전체</span></li>";
            mapLayerHtml += "        <li>검색결과 항목수 <span id=''>66,980</span></li>";
            mapLayerHtml += "        <li class='map-pc-item'>선택한 항목수 <span id=''>1</span></li>";
            mapLayerHtml += "    </ul>";
            //20220714 수정부분 end
            //20220713 수정부분 end

            mapLayerHtml += "</div>";
        }
        //20220719 수정부분 end
        //20220712 수정부분 end
    } else if (mapLayerType == "ledgerDetail00") {
        mapLayerId = "map-layer02";
        mapLayerTit = "유량계_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>계측기 값</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA117</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>1</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동코드</th>";
        mapLayerHtml += "                        <td>영흥면</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>남동부수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td>20150511</td>";
        mapLayerHtml += "                        <th>관경</th>";
        mapLayerHtml += "                        <td>100</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>현재상태</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>제작회사명</th>";
        mapLayerHtml += "                        <td>(주)씨엠엔텍</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='reload-btn' onclick=''>";
        mapLayerHtml += "            <span>새로고침</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>유량 (㎥)</th>";
        mapLayerHtml += "                        <td>0000.0</td>";
        mapLayerHtml += "                        <th>압력 (㎏/㎠)</th>";
        mapLayerHtml += "                        <td>0.0</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>전일유량 (㎥)</th>";
        mapLayerHtml += "                        <td>0000.0</td>";
        mapLayerHtml += "                        <th></th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail01") {
        mapLayerId = "map-layer02";
        mapLayerTit = "수압측정지점_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>계측기 값</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA912</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>1</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동코드</th>";
        mapLayerHtml += "                        <td>계산1동</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>북부수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>시리얼번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>등록구</th>";
        mapLayerHtml += "                        <td>계양구</td>";
        mapLayerHtml += "                        <th>사업소</th>";
        mapLayerHtml += "                        <td>245</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>위치</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>갱신일</th>";
        mapLayerHtml += "                        <td>2018-02-14 00:00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='reload-btn' onclick=''>";
        mapLayerHtml += "            <span>새로고침</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>유량 (㎥)</th>";
        mapLayerHtml += "                        <td>0000.0</td>";
        mapLayerHtml += "                        <th>압력 (㎏/㎠)</th>";
        mapLayerHtml += "                        <td>0.0</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>전일유량 (㎥)</th>";
        mapLayerHtml += "                        <td>0000.0</td>";
        mapLayerHtml += "                        <th></th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail02") {
        mapLayerId = "map-layer02";
        mapLayerTit = "수질측정지점 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>계측기 값</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA911</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>1</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동코드</th>";
        mapLayerHtml += "                        <td>가좌2동</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>수도시설관리소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>등록구</th>";
        mapLayerHtml += "                        <td>서구</td>";
        mapLayerHtml += "                        <th>사업소</th>";
        mapLayerHtml += "                        <td>서부수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>위치</th>";
        mapLayerHtml += "                        <td>141.8</td>";
        mapLayerHtml += "                        <th>갱신일</th>";
        mapLayerHtml += "                        <td>2020-04-23 00:00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>라벨</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>블록코드</th>";
        mapLayerHtml += "                        <td>835</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='reload-btn' onclick=''>";
        mapLayerHtml += "            <span>새로고침</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>탁도 (NTU)</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                        <th>pH</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>잔류염소 (㎎/ℓ)</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                        <th>전기전도도 (㎲/㎝)</th>";
        mapLayerHtml += "                        <td>000.0</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>수온 (℃)</th>";
        mapLayerHtml += "                        <td>0.0</td>";
        mapLayerHtml += "                        <th></th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail03") {
        mapLayerId = "map-layer02";
        mapLayerTit = "수위측정지점 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>계측기 값</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA911</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>1</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동코드</th>";
        mapLayerHtml += "                        <td>가좌2동</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>수도시설관리소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>등록구</th>";
        mapLayerHtml += "                        <td>서구</td>";
        mapLayerHtml += "                        <th>사업소</th>";
        mapLayerHtml += "                        <td>서부수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>위치</th>";
        mapLayerHtml += "                        <td>141.8</td>";
        mapLayerHtml += "                        <th>갱신일</th>";
        mapLayerHtml += "                        <td>2020-04-23 00:00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>라벨</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>블록코드</th>";
        mapLayerHtml += "                        <td>835</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='reload-btn' onclick=''>";
        mapLayerHtml += "            <span>새로고침</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>수위 (㎝)</th>";
        mapLayerHtml += "                        <td>000</td>";
        mapLayerHtml += "                        <th></th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail04") {
        mapLayerId = "map-layer02";
        mapLayerTit = "상수관로_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTabGrid(this,\"" + mapLayerType+ "\");'>공사 대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab03' onclick='setMapTopTab(this);'>관련 계통도</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "        <button type='button' class='watercut-btn' onclick='openLayer(\"confirm\",\"선택한 상수관로의 단수지역을 분석하시겠습니까?<br>분석하는데 시간이 좀 걸릴 수 있습니다.\",\"openMapWatercutLayer(\\\"param1\\\",\\\"param2\\\")\");'>";
        mapLayerHtml += "            <span>단수분석</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>블록</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>구경</th>";
        mapLayerHtml += "                        <td>200.000000</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>비상관로</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>상수관로</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>1</td>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>백령면</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td>20050227</td>";
        mapLayerHtml += "                        <th>관용도</th>";
        mapLayerHtml += "                        <td>배수관</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>탐사구분</th>";
        mapLayerHtml += "                        <td>";
        mapLayerHtml += "                            공공측량";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "                            <button type='button' class='c-btn01' data-detail-idx='1' onclick='openMapLayer(this,\"infoDetail00\");'>";
        mapLayerHtml += "                                <span>보기</span>";
        mapLayerHtml += "                            </button> ";
        mapLayerHtml += "                        </td>";
        mapLayerHtml += "                        <th>세관일자</th>";
        mapLayerHtml += "                        <td>";
        mapLayerHtml += "                            2006-05-04";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "                            <button type='button' class='c-btn01' data-detail-idx='1' onclick='openMapLayer(this,\"infoDetail01\");'>";
        mapLayerHtml += "                                <span>보기</span>";
        mapLayerHtml += "                            </button> ";
        mapLayerHtml += "                        </td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
        
        //20220803 수정부분 start
        //map-listdetail-con : 리스트 + 상세를 동시에 보여줄 경우
        mapLayerHtml += "<div class='map-toptab-con map-listdetail-con' id='mapTopTab02'>";
        //20220803 수정부분 end
        
        mapLayerHtml += "    <div class='map-list-area map-ledger-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "        <div class='dynamic-grid-area' id='map-ledger2-grid-area'></div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-ledger2-list-area'>";
        mapLayerHtml += "        <div class='map-topbtn-area'>";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "            <button type='button' class='detail-btn' data-detail-idx='1' onclick='openMapLayer(this,\"infoDetail03\");'>";
        mapLayerHtml += "                <span>상세보기</span>";
        mapLayerHtml += "            </button> ";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "            <div class='c-table-area' id=''>";
        mapLayerHtml += "                <table class='c-table c-table-fix'>";
        mapLayerHtml += "                    <colgroup>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                    </colgroup>";
        mapLayerHtml += "                    <tbody>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>관리기관</th>";
        mapLayerHtml += "                            <td>중부수도사업소</td>";
        mapLayerHtml += "                            <th>공사번호</th>";
        mapLayerHtml += "                            <td>20060035</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>기준년도</th>";
        mapLayerHtml += "                            <td>2006</td>";
        mapLayerHtml += "                            <th>공사명</th>";
        mapLayerHtml += "                            <td>공사명1</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>공사구분</th>";
        mapLayerHtml += "                            <td>누수</td>";
        mapLayerHtml += "                            <th>공사감독자</th>";
        mapLayerHtml += "                            <td>홍길동</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                    </tbody>";
        mapLayerHtml += "                </table>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
        
        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab03'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='reload-btn' onclick=''>";
        mapLayerHtml += "            <span>새로고침</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='map-contab-area'>";
        mapLayerHtml += "            <ul class='map-contab-list'>";
        mapLayerHtml += "                <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "                   <a href='javascript:void(0);' id='' data-tab-id='mapConTab01' onclick='setMapConTab(this);'>부평정수장</a>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                   <a href='javascript:void(0);' id='' data-tab-id='mapConTab02' onclick='setMapConTab(this);'>천마산배수지</a>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                   <a href='javascript:void(0);' id='' data-tab-id='mapConTab03' onclick='setMapConTab(this);'>계산1가압장</a>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </div>";
        
        mapLayerHtml += "        <div class='map-contab-con' id='mapConTab01'>";
        mapLayerHtml += "            <div class='c-table-area' id=''>";
        mapLayerHtml += "                <table class='c-table c-table-fix'>";
        mapLayerHtml += "                    <colgroup>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                    </colgroup>";
        mapLayerHtml += "                    <tbody>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>원수유입유량 (㎥/h)</th>";
        mapLayerHtml += "                            <td>0000.00</td>";
        mapLayerHtml += "                            <th>탁도 (NTU)</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>잔류염소 (㎎/ℓ)</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                            <th>pH</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>송수압 (㎏/㎠)</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                            <th>송수유량 (㎥/h)</th>";
        mapLayerHtml += "                            <td>0000.00</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                    </tbody>";
        mapLayerHtml += "               </table>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        
        mapLayerHtml += "        <div class='map-contab-con' id='mapConTab02'>";
        mapLayerHtml += "            <div class='c-table-area' id=''>";
        mapLayerHtml += "                <table class='c-table c-table-fix'>";
        mapLayerHtml += "                    <colgroup>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                    </colgroup>";
        mapLayerHtml += "                    <tbody>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>유입압력 (㎏/㎠)</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                            <th>유출유량 (㎥/h)</th>";
        mapLayerHtml += "                            <td>0000.00</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>잔류염소 (㎎/ℓ)</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                            <th>pH</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>수온 (℃)</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                            <th>수위1 (㎝)</th>";
        mapLayerHtml += "                            <td>000</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>수위2 (㎝)</th>";
        mapLayerHtml += "                            <td>000</td>";
        mapLayerHtml += "                            <th></th>";
        mapLayerHtml += "                            <td></td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                    </tbody>";
        mapLayerHtml += "               </table>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        
        mapLayerHtml += "        <div class='map-contab-con' id='mapConTab03'>";
        mapLayerHtml += "            <div class='c-table-area' id=''>";
        mapLayerHtml += "                <table class='c-table c-table-fix'>";
        mapLayerHtml += "                    <colgroup>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                    </colgroup>";
        mapLayerHtml += "                    <tbody>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>흡입압력 (㎏/㎠)</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                            <th>토출압력 (㎏/㎠)</th>";
        mapLayerHtml += "                            <td>0.00</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                    </tbody>";
        mapLayerHtml += "               </table>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail05") {
        mapLayerId = "map-layer02";
        mapLayerTit = "상수관로심도 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>GLOBALID</th>";
        mapLayerHtml += "                        <td>{838DEAC1-555F-4C...}</td>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA923</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관리번호</th>";
        mapLayerHtml += "                        <td>00007969</td>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>2820052100</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관리기관</th>";
        mapLayerHtml += "                        <td>MNGT220</td>";
        mapLayerHtml += "                        <th>사업소</th>";
        mapLayerHtml += "                        <td>200</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>갱신일</th>";
        mapLayerHtml += "                        <td>2008-06-24 00:00</td>";
        mapLayerHtml += "                        <th>블록</th>";
        mapLayerHtml += "                        <td>510</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail06") {
        mapLayerId = "map-layer02";
        mapLayerTit = "제수변_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTabGrid(this,\"" + mapLayerType + "\");'>제수변 대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA200</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>23303</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동코드</th>";
        mapLayerHtml += "                        <td>교동면</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>강화수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td>20180058</td>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>대장초기화여부</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                        <th>각도</th>";
        mapLayerHtml += "                        <td>353</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>개폐여부</th>";
        mapLayerHtml += "                        <td>개</td>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td>20181215</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
        
        //20220803 수정부분 start
        //map-listdetail-con : 리스트 + 상세를 동시에 보여줄 경우
        mapLayerHtml += "<div class='map-toptab-con map-listdetail-con' id='mapTopTab02'>";
        //20220803 수정부분 end
        
        mapLayerHtml += "    <div class='map-list-area map-ledger-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "        <div class='dynamic-grid-area' id='map-ledger2-grid-area'></div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-ledger2-list-area'>";
        mapLayerHtml += "        <div class='map-topbtn-area'>";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "            <button type='button' class='detail-btn' data-detail-idx='1' onclick='openMapLayer(this,\"infoDetail02\");'>";
        mapLayerHtml += "                <span>상세보기</span>";
        mapLayerHtml += "            </button> ";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "            <div class='c-table-area' id=''>";
        mapLayerHtml += "                <table class='c-table c-table-fix'>";
        mapLayerHtml += "                    <colgroup>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                        <col width='*'>";
        mapLayerHtml += "                    </colgroup>";
        mapLayerHtml += "                    <tbody>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>관리기관</th>";
        mapLayerHtml += "                            <td>중부수도사업소</td>";
        mapLayerHtml += "                            <th>개별번호</th>";
        mapLayerHtml += "                            <td>23303</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>지형지물부호</th>";
        mapLayerHtml += "                            <td>SA200</td>";
        mapLayerHtml += "                            <th>개폐유무</th>";
        mapLayerHtml += "                            <td>개</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                        <tr>";
        mapLayerHtml += "                            <th>개폐사유</th>";
        mapLayerHtml += "                            <td>개폐사유</td>";
        mapLayerHtml += "                            <th>작업자</th>";
        mapLayerHtml += "                            <td>작업자</td>";
        mapLayerHtml += "                        </tr>";
        mapLayerHtml += "                    </tbody>";
        mapLayerHtml += "                </table>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail07") {
        mapLayerId = "map-layer02";
        mapLayerTit = "제수변_자동드레인 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA200</td>";
        mapLayerHtml += "                        <th>방출량</th>";
        mapLayerHtml += "                        <td>0000.0</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>방출일시</th>";
        mapLayerHtml += "                        <td>2022-05-16</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>23303</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동코드</th>";
        mapLayerHtml += "                        <td>교동면</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>강화수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td>20180058</td>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>대장초기화여부</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                        <th>각도</th>";
        mapLayerHtml += "                        <td>353</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
        
    //20220714 수정부분 start
    } else if (mapLayerType == "ledgerDetail08") {
        mapLayerId = "map-layer02";
        mapLayerTit = "급수관로_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>공사대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>블록코드</th>";
        mapLayerHtml += "                        <td>904</td>";
        mapLayerHtml += "                        <th>구경</th>";
        mapLayerHtml += "                        <td>32</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>비상관로</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>급수관로</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>7</td>";
        mapLayerHtml += "                        <th>행정읍면동코드</th>";
        mapLayerHtml += "                        <td>교동면</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td>20170325</td>";
        mapLayerHtml += "                        <th>관용도</th>";
        mapLayerHtml += "                        <td>급수관</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>연장</th>";
        mapLayerHtml += "                        <td>32.06999969</td>";
        mapLayerHtml += "                        <th>관라벨</th>";
        mapLayerHtml += "                        <td>2017/STS/32/57.52</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'></div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>계약일</th>";
        mapLayerHtml += "                        <td>2019-02-20</td>";
        mapLayerHtml += "                        <th>공사구분</th>";
        mapLayerHtml += "                        <td>급수</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사도급액</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>공사명</th>";
        mapLayerHtml += "                        <td>2017년 교동면 2구역</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td>20170128</td>";
        mapLayerHtml += "                        <th>공사변경금액</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사설계금액</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>관급자재도금액</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관급자재변경금액</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>관급자재설계금액</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail09") {
        mapLayerId = "map-layer02";
        mapLayerTit = "누수불출수지점_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>공사대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>누수지점</td>";
        mapLayerHtml += "                        <th>관리번호</th>";
        mapLayerHtml += "                        <td>00202178</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>용현5동</td>";
        mapLayerHtml += "                        <th>관리기관</th>";
        mapLayerHtml += "                        <td>중부수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td>20090170</td>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>대장초기화여부</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>관경</th>";
        mapLayerHtml += "                        <td>50.000000</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관로지형지물부호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>관로관리번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'></div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>계약일</th>";
        mapLayerHtml += "                        <td>2019-10-14</td>";
        mapLayerHtml += "                        <th>공사구분</th>";
        mapLayerHtml += "                        <td>누수</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사도급액</th>";
        mapLayerHtml += "                        <td>75,075,000.00</td>";
        mapLayerHtml += "                        <th>공사명</th>";
        mapLayerHtml += "                        <td>누수수리공사2구역</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td>20090170</td>";
        mapLayerHtml += "                        <th>공사변경금액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사설계금액</th>";
        mapLayerHtml += "                        <td>75,075,000.00</td>";
        mapLayerHtml += "                        <th>관급자재도금액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관급자재변경금액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                        <th>관급자재설계금액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail10") {
        mapLayerId = "map-layer02";
        mapLayerTit = "소화전_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>공사대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA119</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>4</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>가좌1동</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>소방서</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td>20160044</td>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>대장초기화여부</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                        <th>각도</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>현재상태</th>";
        mapLayerHtml += "                        <td>정상</td>";
        mapLayerHtml += "                        <th>소화전형식</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'></div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>계약일</th>";
        mapLayerHtml += "                        <td>2016-07-27</td>";
        mapLayerHtml += "                        <th>공사구분</th>";
        mapLayerHtml += "                        <td>일반</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사도급액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                        <th>공사명</th>";
        mapLayerHtml += "                        <td>831블록내 가좌동</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td>20160044</td>";
        mapLayerHtml += "                        <th>공사변경금액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사설계금액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                        <th>관급자재도금액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관급자재변경금액</th>";
        mapLayerHtml += "                        <td>0.00</td>";
        mapLayerHtml += "                        <th>기준년</th>";
        mapLayerHtml += "                        <td>2016</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail11") {
        mapLayerId = "map-layer02";
        mapLayerTit = "수도전_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA122</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>184</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>강화읍</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>강화수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>대장초기화여부</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td>1996-09-30</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>제작회사명</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>관로지형지물부호</th>";
        mapLayerHtml += "                        <td>급수관로</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail12") {
        mapLayerId = "map-layer02";
        mapLayerTit = "급수구역_전체 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>급수구역</td>";
        mapLayerHtml += "                        <th>관리번호</th>";
        mapLayerHtml += "                        <td>00000348</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>서부수도사업소</td>";
        mapLayerHtml += "                        <th>급수구역명</th>";
        mapLayerHtml += "                        <td>연희동 378일원</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>급수구역세대수</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                        <th>급수구역인구수</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>급수구역면적</th>";
        mapLayerHtml += "                        <td>630000.000000</td>";
        mapLayerHtml += "                        <th>관라벨</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>시스템사용</th>";
        mapLayerHtml += "                        <td>1</td>";
        mapLayerHtml += "                        <th>갱신일</th>";
        mapLayerHtml += "                        <td>2014-07-16 00:00</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail13") {
        mapLayerId = "map-layer02";
        mapLayerTit = "역지변 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA201</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>61970</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>옥련1동</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>남동부수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>대장초기화여부</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                        <th>각도</th>";
        mapLayerHtml += "                        <td>65</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>개폐여부</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail14") {
        mapLayerId = "map-layer02";
        mapLayerTit = "상수숨은관로 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>블록</th>";
        mapLayerHtml += "                        <td>204</td>";
        mapLayerHtml += "                        <th>구경</th>";
        mapLayerHtml += "                        <td>50.000000</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>상수관로</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>7098</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>화수1</td>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td>20080808</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관용도</th>";
        mapLayerHtml += "                        <td>SAA000</td>";
        mapLayerHtml += "                        <th>관리기관</th>";
        mapLayerHtml += "                        <td>중부수도사업소</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관재질</th>";
        mapLayerHtml += "                        <td>ASP</td>";
        mapLayerHtml += "                        <th>대장초기화여부</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail15") {
        mapLayerId = "map-layer02";
        mapLayerTit = "세척구 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA941</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>2</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>2820067000</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>MNGT200</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td>20120017</td>";
        mapLayerHtml += "                        <th>설치일자</th>";
        mapLayerHtml += "                        <td>20090101</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관경</th>";
        mapLayerHtml += "                        <td>100</td>";
        mapLayerHtml += "                        <th>등록구</th>";
        mapLayerHtml += "                        <td>남동구</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>사업소</th>";
        mapLayerHtml += "                        <td>200</td>";
        mapLayerHtml += "                        <th>위치</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail16") {
        mapLayerId = "map-layer02";
        mapLayerTit = "저수조 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA120</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>2</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td>계산2동</td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>소방서</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>준공일자</th>";
        mapLayerHtml += "                        <td>200770814</td>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>대장초기화여부</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>건물주소</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>허가일자</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>건물유형</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "ledgerDetail17") {
        mapLayerId = "map-layer02";
        mapLayerTit = "정수장 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>SA113</td>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>2</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>행정읍면동</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>관리기관코드</th>";
        mapLayerHtml += "                        <td>수자원공사</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>취수장명</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>준공일자</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>부지면적</th>";
        mapLayerHtml += "                        <td>0</td>";
        mapLayerHtml += "                        <th>공사번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>도엽번호</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                        <th>수원구분</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    //20220714 수정부분 end
        
    //20220719 수정부분 start
    } else if (mapLayerType == "ledgerDetail18") {
        mapLayerId = "map-layer02";
        mapLayerTit = "RFID태그 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='position-btn' onclick=''>";
        mapLayerHtml += "            <span>위치확인</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>Objectid</th>";
        mapLayerHtml += "                        <td>2971</td>";
        mapLayerHtml += "                        <th>ASSETGROUP</th>";
        mapLayerHtml += "                        <td>115</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>ASSETTYPE</th>";
        mapLayerHtml += "                        <td>200</td>";
        mapLayerHtml += "                        <th>지형지물부호</th>";
        mapLayerHtml += "                        <td>제수변</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>21690</td>";
        mapLayerHtml += "                        <th>HJD_CDE</th>";
        mapLayerHtml += "                        <td>연희동</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>사업소</th>";
        mapLayerHtml += "                        <td>서부수도사업소</td>";
        mapLayerHtml += "                        <th>ANG_DIR</th>";
        mapLayerHtml += "                        <td>86.000000</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>OFF_CDE</th>";
        mapLayerHtml += "                        <td>1</td>";
        mapLayerHtml += "                        <th>IST_YMD</th>";
        mapLayerHtml += "                        <td>20131227</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>"; 
    } else if (mapLayerType == "ledgerDetail19") {
        mapLayerId = "map-layer02";
        mapLayerTit = "RFID테이블 대장";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>대장</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'></div>";
        mapLayerHtml += "    <div class='map-list-area map-ledger-detail-area'>";
        mapLayerHtml += "        <div class='c-table-area' id=''>";
        mapLayerHtml += "            <table class='c-table c-table-fix'>";
        mapLayerHtml += "                <colgroup>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                    <col width='*'>";
        mapLayerHtml += "                </colgroup>";
        mapLayerHtml += "                <tbody>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>개별번호</th>";
        mapLayerHtml += "                        <td>64806</td>";
        mapLayerHtml += "                        <th>시설물</th>";
        mapLayerHtml += "                        <td>배기변</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>절개형태</th>";
        mapLayerHtml += "                        <td>상수관로</td>";
        mapLayerHtml += "                        <th>폐쇄여부</th>";
        mapLayerHtml += "                        <td>비폐</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>등록구</th>";
        mapLayerHtml += "                        <td>인천시 남동구</td>";
        mapLayerHtml += "                        <th>행정동</th>";
        mapLayerHtml += "                        <td></td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>관리기관</th>";
        mapLayerHtml += "                        <td>상수관로</td>";
        mapLayerHtml += "                        <th>블록</th>";
        mapLayerHtml += "                        <td>550</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>뚜껑규격</th>";
        mapLayerHtml += "                        <td>648</td>";
        mapLayerHtml += "                        <th>변실규격</th>";
        mapLayerHtml += "                        <td>1.5X1.2X1.3</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                    <tr>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                        <th>...</th>";
        mapLayerHtml += "                        <td>...</td>";
        mapLayerHtml += "                    </tr>";
        mapLayerHtml += "                </tbody>";
        mapLayerHtml += "            </table>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    //20220719 수정부분 end
        
    } else if (mapLayerType.indexOf("infoList") > -1) {        
        var mapSearchLayerHtml = "";
        mapLayerId = "map-layer03";
        
        //20220712 수정부분 start
        if (mapLayerType == "infoList00") {
            mapLayerTit = "공공측량정보 목록";
            
            //20220713 수정부분 start
            mapLayerName = "공공측량정보";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>지형지물부호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='지형지물부호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>기준년도</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='기준년도'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "infoList01") {
            mapLayerTit = "관세척정보 목록";
            
            //20220713 수정부분 start
            mapLayerName = "관세척정보";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>개별번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='개별번호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>지형지물부호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='지형지물부호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>기준년도</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='기준년도'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "infoList02") {
            mapLayerTit = "밸브정보 목록";
            
            //20220713 수정부분 start
            mapLayerName = "밸브정보";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>개별번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='개별번호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>지형지물부호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='지형지물부호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "infoList03") {
            mapLayerTit = "공사정보 목록";
            
            //20220713 수정부분 start
            mapLayerName = "공사정보";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>공사번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='공사번호'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>공사명</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='공사명'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>기준년도</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='기준년도'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "infoList04") {
            mapLayerTit = "현장정보 목록";
            
            //20220713 수정부분 start
            mapLayerName = "현장정보";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>접수번호</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>담당자명</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        } else if (mapLayerType == "infoList05") {
            mapLayerTit = "민원신고 목록";
            
            //20220713 수정부분 start
            mapLayerName = "민원신고";
            //20220713 수정부분 end
            
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>관리기관</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>민원인성명</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='민원인성명'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>접수자성명</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <input type='text' id='' name='' placeholder='접수자성명'>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
            mapSearchLayerHtml += "        <li>";
            mapSearchLayerHtml += "            <div class='map-topsearch-tit'>시공업체</div>";
            mapSearchLayerHtml += "            <div class='map-topsearch-con'>";
            mapSearchLayerHtml += "                <select id='' name=''>";
            mapSearchLayerHtml += "                    <option value=''>선택</option>";
            mapSearchLayerHtml += "                </select>";
            mapSearchLayerHtml += "            </div>";
            mapSearchLayerHtml += "        </li>";
        }
        
        mapLayerHtml += "<div class='map-topbtn-area'>";
        mapLayerHtml += "    <button type='button' class='search-btn' onclick='setMapListSearch(this);'>";
        mapLayerHtml += "        <span>속성검색</span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "    <button type='button' class='reload-btn' onclick='setMapInfoGrid(this,\"" + mapLayerType + "\")'>";
        mapLayerHtml += "        <span>새로고침</span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "    <button type='button' class='clear-btn' disabled onclick='setMapListClear(this,\"" + mapLayerType + "\");'>";
        mapLayerHtml += "        <span>선택해제</span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "    <button type='button' class='position-btn' disabled onclick=''>";
        mapLayerHtml += "        <span>위치확인</span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "    <button type='button' class='selected-btn map-pc-item' disabled onclick=''>";
        mapLayerHtml += "        <span>선택한 항목만</span>";
        mapLayerHtml += "    </button>";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='detail-btn' disabled data-detail-idx='1' onclick='openMapLayer(this,\"" + (mapLayerType.replace("infoList","infoDetail")) + "\");'>";
        mapLayerHtml += "        <span>상세보기</span>";
        mapLayerHtml += "    </button>";
        
        //20220714 수정부분 start
        mapLayerHtml += "    <button type='button' class='csv-btn map-pc-item' onclick='getDynamicGridCsv(\"mapInfoGrid\");'>";
        mapLayerHtml += "        <span>CSV파일로 다운로드</span>";
        mapLayerHtml += "    </button>";
        //20220714 수정부분 end
        
        //20220713 수정부분 start
        mapLayerHtml += "    <button type='button' class='c-btn01 field-btn map-pc-item' onclick=''>";
        mapLayerHtml += "        <span><img class='svg' src='img/view-column.svg' alt='필드목록'></span>";
        mapLayerHtml += "    </button>";
        //20220713 수정부분 end
        
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-topsearch-area'>";
        mapLayerHtml += "    <ul class='map-topsearch-list'>";
        mapLayerHtml += mapSearchLayerHtml;
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "    <button type='button' class='c-btn01 detail-search-btn map-pc-item' onclick=''>";
        mapLayerHtml += "        <span>상세검색</span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "    <button type='button' class='c-btn01 quick-search-btn map-pc-item' onclick='setMapListSearchResult(this,\"" + mapLayerType + "\")'>";
        mapLayerHtml += "        <span>빠른검색</span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "    <button type='button' class='c-btn01 map-mobile-item' onclick='setMapListSearchResult(this,\"" + mapLayerType + "\")'>";
        mapLayerHtml += "        <span>검색</span>";
        mapLayerHtml += "    </button>";
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-list-area map-info-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "    <div class='dynamic-grid-area' id='map-info-grid-area'></div>";
        
        //20220713 수정부분 start
        //20220714 수정부분 start
        mapLayerHtml += "    <ul class='map-list-result'>";
        mapLayerHtml += "        <li class='map-pc-item'>레이어 <span id=''>" + mapLayerName + "</span></li>";
        mapLayerHtml += "        <li>전체 항목수 <span id=''>66,980</span></li>";
        mapLayerHtml += "        <li class='map-pc-item'>검색조건 <span id=''>전체</span></li>";
        mapLayerHtml += "        <li>검색결과 항목수 <span id=''>66,980</span></li>";
        mapLayerHtml += "        <li class='map-pc-item'>선택한 항목수 <span id=''>1</span></li>";
        mapLayerHtml += "    </ul>";
        //20220714 수정부분 end
        //20220713 수정부분 end
        
        mapLayerHtml += "</div>";
        //20220712 수정부분 end
    } else if (mapLayerType == "infoDetail00") {
        mapLayerId = "map-layer04";
        mapLayerTit = "공공측량정보 상세";
        
        mapLayerHtml += "<div class='map-topbtn-area'>";
        mapLayerHtml += "    <button type='button' class='c-btn01 ml-auto-btn list-btn' onclick='openMapLayer(this,\"infoList00\");'>";
        mapLayerHtml += "        <span>목록</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-list-area map-info-detail-area'>";
        mapLayerHtml += "    <div class='c-table-area' id=''>";
        mapLayerHtml += "        <table class='c-table c-table-fix'>";
        mapLayerHtml += "            <colgroup>";
        mapLayerHtml += "                <col width='*'>";
        mapLayerHtml += "                <col width='*'>";
        mapLayerHtml += "                <col width='*'>";
        mapLayerHtml += "                <col width='*'>";
        mapLayerHtml += "            </colgroup>";
        mapLayerHtml += "            <tbody>";
        mapLayerHtml += "                <tr>";
        mapLayerHtml += "                    <th>관리기관</th>";
        mapLayerHtml += "                    <td>중부수도사업소</td>";
        mapLayerHtml += "                    <th>지형지물부호</th>";
        mapLayerHtml += "                    <td>상수관로</td>";
        mapLayerHtml += "                </tr>";
        mapLayerHtml += "                <tr>";
        mapLayerHtml += "                    <th>기준년도</th>";
        mapLayerHtml += "                    <td>2006</td>";
        mapLayerHtml += "                    <th>업로드일자</th>";
        mapLayerHtml += "                    <td>2006-05-17</td>";
        mapLayerHtml += "                </tr>";
        mapLayerHtml += "                <tr>";
        mapLayerHtml += "                    <th>측량업체명</th>";
        mapLayerHtml += "                    <td>업체명</td>";
        mapLayerHtml += "                    <th>측량업체담당자</th>";
        mapLayerHtml += "                    <td>담당자</td>";
        mapLayerHtml += "                </tr>";
        mapLayerHtml += "                <tr>";
        mapLayerHtml += "                    <th>등록일</th>";
        mapLayerHtml += "                    <td>2006-05-17</td>";
        mapLayerHtml += "                    <th>수정일</th>";
        mapLayerHtml += "                    <td>2006-05-17</td>";
        mapLayerHtml += "                </tr>";
        mapLayerHtml += "            </tbody>";
        mapLayerHtml += "        </table>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "infoDetail01") {
        mapLayerId = "map-layer04";
        mapLayerTit = "관세척정보 등록";
        
        mapLayerHtml += "<div class='map-topbtn-area'>";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 register-btn' data-detail-idx='' onclick='openMapLayer(this,\"infoDetail01\");'>";
        mapLayerHtml += "        <span>신규</span>";
        mapLayerHtml += "    </button> ";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "    <button type='button' class='c-btn01 modify-btn' onclick='setMapDetailModify(this);'>";
            mapLayerHtml += "        <span>수정</span>";
            mapLayerHtml += "    </button> ";
        }
        
        mapLayerHtml += "    <button type='button' class='c-btn01 save-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " onclick=''>";
        mapLayerHtml += "        <span>저장</span>";
        mapLayerHtml += "    </button> ";

        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 mr-auto-btn cancel-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " data-detail-idx='" + dataDetailIdx + "' onclick='openMapLayer(this,\"infoDetail01\");'>";
        mapLayerHtml += "        <span>취소</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "    <button type='button' class='c-btn01 list-btn' onclick='openMapLayer(this,\"infoList01\");'>";
        mapLayerHtml += "        <span>목록</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-list-area map-info-detail-area'>";
        mapLayerHtml += "    <ul class='map-input-list' id=''>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>개별번호</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>지형지물부호</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>기준년도</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='c-year-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>시공업체</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>등록자</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>관세척시작일</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>관세척종료일</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>구경</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>관종</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>재질</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>등록일</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>비고</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-separate'></div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-con'>";
        mapLayerHtml += "                    <button type='button' class='c-btn01 setposition-btn' onclick=''>";
        mapLayerHtml += "                        <span>위치설정</span>";
        mapLayerHtml += "                    </button> ";
        
        //20220711 수정부분 start
        //only-abled : 언제나 수정 가능한 항목
        mapLayerHtml += "                    <button type='button' class='c-btn01 position-btn only-abled' onclick=''>";
        //20220711 수정부분 end
        
        mapLayerHtml += "                        <span>위치확인</span>";
        mapLayerHtml += "                    </button> ";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>주소</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>블록코드</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "infoDetail02") {
        mapLayerId = "map-layer04";
        mapLayerTit = "밸브정보 등록";
        
        mapLayerHtml += "<div class='map-topbtn-area'>";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 register-btn' data-detail-idx='' onclick='openMapLayer(this,\"infoDetail02\");'>";
        mapLayerHtml += "        <span>신규</span>";
        mapLayerHtml += "    </button> ";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "    <button type='button' class='c-btn01 modify-btn' onclick='setMapDetailModify(this);'>";
            mapLayerHtml += "        <span>수정</span>";
            mapLayerHtml += "    </button> ";
        }
        
        mapLayerHtml += "    <button type='button' class='c-btn01 save-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " onclick=''>";
        mapLayerHtml += "        <span>저장</span>";
        mapLayerHtml += "    </button> ";

        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 mr-auto-btn cancel-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " data-detail-idx='" + dataDetailIdx + "' onclick='openMapLayer(this,\"infoDetail02\");'>";
        mapLayerHtml += "        <span>취소</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "    <button type='button' class='c-btn01 list-btn' onclick='openMapLayer(this,\"infoList02\");'>";
        mapLayerHtml += "        <span>목록</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-list-area map-info-detail-area'>";
        mapLayerHtml += "    <ul class='map-input-list' id=''>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>개별번호</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>지형지물부호</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>개폐유무</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>개폐사유</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>작업자</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>등록자</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input map-input-half'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>등록일</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "            </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "            <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                <div class='map-input-con'></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>비고</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-separate'></div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-con'>";
        mapLayerHtml += "                    <button type='button' class='c-btn01 setposition-btn' onclick=''>";
        mapLayerHtml += "                        <span>위치설정</span>";
        mapLayerHtml += "                    </button> ";
        
        //20220711 수정부분 start
        //only-abled : 언제나 수정 가능한 항목
        mapLayerHtml += "                    <button type='button' class='c-btn01 position-btn only-abled' onclick=''>";
        //20220711 수정부분 end
        
        mapLayerHtml += "                        <span>위치확인</span>";
        mapLayerHtml += "                    </button> ";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>주소</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>블록코드</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "infoDetail03") {
        mapLayerId = "map-layer04";
        mapLayerTit = "공사정보 등록";
        
        mapLayerHtml += "<div class='map-topbtn-area'>";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 register-btn' data-detail-idx='' onclick='openMapLayer(this,\"infoDetail03\");'>";
        mapLayerHtml += "        <span>신규</span>";
        mapLayerHtml += "    </button> ";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "    <button type='button' class='c-btn01 modify-btn' onclick='setMapDetailModify(this);'>";
            mapLayerHtml += "        <span>수정</span>";
            mapLayerHtml += "    </button> ";
        }
        
        mapLayerHtml += "    <button type='button' class='c-btn01 save-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " onclick=''>";
        mapLayerHtml += "        <span>저장</span>";
        mapLayerHtml += "    </button> ";

        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 mr-auto-btn cancel-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " data-detail-idx='" + dataDetailIdx + "' onclick='openMapLayer(this,\"infoDetail03\");'>";
        mapLayerHtml += "        <span>취소</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "    <button type='button' class='c-btn01 list-btn' onclick='openMapLayer(this,\"infoList03\");'>";
        mapLayerHtml += "        <span>목록</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-list-area map-info-detail-area'>";
        mapLayerHtml += "    <div class='map-toptab-area'>";
        mapLayerHtml += "        <ul class='map-toptab-list'>";
        mapLayerHtml += "            <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "                <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>공사" + (dataDetailIdx != "" ? "<br>" : "") + "대장</a>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>공사" + (dataDetailIdx != "" ? "<br>" : "") + "비용</a>";
        mapLayerHtml += "            </li>";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <a href='javascript:void(0);' data-tab-id='mapTopTab03' onclick='setMapTopTab(this);'>공사<br>감독</a>";
            mapLayerHtml += "            </li>";
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <a href='javascript:void(0);' data-tab-id='mapTopTab04' onclick='setMapTopTab(this);'>시설<br>내역</a>";
            mapLayerHtml += "            </li>";
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <a href='javascript:void(0);' data-tab-id='mapTopTab05' onclick='setMapTopTab(this);'>보수<br>이력</a>";
            mapLayerHtml += "            </li>";
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <a href='javascript:void(0);' data-tab-id='mapTopTab06' onclick='setMapTopTab(this);'>준공<br>도면</a>";
            mapLayerHtml += "            </li>";
        }
        
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "        <ul class='map-input-list' id=''>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사번호</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>기준년도</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-year-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사명</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사구분</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>입력자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>계약일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>최초입력일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>착공일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>설계자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>준공검사일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>준공검사자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>준공일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도급자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도급방법</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>인수인계일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도로굴착신청일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도로굴착승인일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>하자보수기간</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>하자보수시작일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>기타</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-con'>";
        mapLayerHtml += "                        <button type='button' class='c-btn01 setposition-btn' onclick=''>";
        mapLayerHtml += "                            <span>위치설정</span>";
        mapLayerHtml += "                        </button> ";
        
        //20220711 수정부분 start
        //only-abled : 언제나 수정 가능한 항목
        mapLayerHtml += "                        <button type='button' class='c-btn01 position-btn only-abled' onclick=''>";
        //20220711 수정부분 end
        
        mapLayerHtml += "                            <span>위치확인</span>";
        mapLayerHtml += "                        </button> ";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        
        //20220711 수정부분 start
        mapLayerHtml += "    <div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "        <ul class='map-input-list' id=''>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>예산액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        
        //tit : 제목만 있을 경우
        mapLayerHtml += "                    <div class='map-input-con tit'>공사</div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>설계금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도급액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>변경금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        
        //tit : 제목만 있을 경우
        mapLayerHtml += "                    <div class='map-input-con tit'>도로굴착</div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>설계금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도급액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>변경금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        
        //tit : 제목만 있을 경우
        mapLayerHtml += "                    <div class='map-input-con tit'>관급자제</div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>설계금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도급액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>변경금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        
        //tit : 제목만 있을 경우
        mapLayerHtml += "                    <div class='map-input-con tit'>폐기물처리</div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>설계금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도급액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>변경금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        
        //tit : 제목만 있을 경우
        mapLayerHtml += "                    <div class='map-input-con tit'>합계금액</div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>총 설계금액</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>총 도급액</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>총 변경금액</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-toptab-con' id='mapTopTab03'>";
        mapLayerHtml += "        <ul class='map-input-list' id=''>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>일련번호</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사번호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사감독자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-con'>";
        mapLayerHtml += "                        <button type='button' class='c-btn01 add-supervisor-btn' onclick=''>";
        mapLayerHtml += "                            <span>감독자 추가</span>";
        mapLayerHtml += "                        </button> ";
        mapLayerHtml += "                        <button type='button' class='c-btn01 save-supervisor-btn' onclick=''>";
        mapLayerHtml += "                            <span>감독자 저장</span>";
        mapLayerHtml += "                        </button> ";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='c-table-area'>";
        mapLayerHtml += "                        <table class='c-table'>";
        mapLayerHtml += "                            <colgroup>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                            </colgroup>";
        mapLayerHtml += "                            <thead>";
        mapLayerHtml += "                                <tr>";
        mapLayerHtml += "                                    <th>관리기관</th>";
        mapLayerHtml += "                                    <th>일련번호</th>";
        mapLayerHtml += "                                    <th>공사번호</th>";
        mapLayerHtml += "                                    <th>공사감독자</th>";
        mapLayerHtml += "                                </tr>";
        mapLayerHtml += "                            </thead>";
        mapLayerHtml += "                            <tbody>";
        
        //selected : 선택한 항목일 경우
        mapLayerHtml += "                                <tr class='selected'>";
        mapLayerHtml += "                                    <td>중부수도사업소</td>";
        mapLayerHtml += "                                    <td>1</td>";
        mapLayerHtml += "                                    <td>20060036</td>";
        mapLayerHtml += "                                    <td>하건수</td>";
        mapLayerHtml += "                                </tr>";
        mapLayerHtml += "                                <tr>";
        mapLayerHtml += "                                    <td>중부수도사업소</td>";
        mapLayerHtml += "                                    <td>1</td>";
        mapLayerHtml += "                                    <td>20060036</td>";
        mapLayerHtml += "                                    <td>하건수</td>";
        mapLayerHtml += "                                </tr>";
        mapLayerHtml += "                            </tbody>";
        mapLayerHtml += "                        </table>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-toptab-con' id='mapTopTab04'>";
        mapLayerHtml += "        <div class='map-contab-area'>";
        mapLayerHtml += "            <ul class='map-contab-list'>";
        mapLayerHtml += "                <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "                    <a href='javascript:void(0);' id='' data-tab-id='mapConTab01' onclick='setMapConTab(this);'>관로시설내역</a>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <a href='javascript:void(0);' id='' data-tab-id='mapConTab02' onclick='setMapConTab(this);'>변류시설내역</a>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <a href='javascript:void(0);' id='' data-tab-id='mapConTab03' onclick='setMapConTab(this);'>기타시설내역</a>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='map-contab-con' id='mapConTab01'>";
        mapLayerHtml += "            <ul class='map-input-list' id=''>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>일련번호</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>공사번호</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                    <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                        <div class='map-input-con'></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-separate'></div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>공사구분</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>관종</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>구경</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>연장</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input'>";
        mapLayerHtml += "                        <div class='map-input-con'>";
        mapLayerHtml += "                            <button type='button' class='c-btn01 add-pipeline-btn' onclick=''>";
        mapLayerHtml += "                                <span>관로시설내역 추가</span>";
        mapLayerHtml += "                            </button> ";
        mapLayerHtml += "                            <button type='button' class='c-btn01 save-pipeline-btn' onclick=''>";
        mapLayerHtml += "                                <span>관로시설내역 저장</span>";
        mapLayerHtml += "                            </button> ";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-separate'></div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input'>";
        mapLayerHtml += "                        <div class='c-table-area'>";
        mapLayerHtml += "                            <table class='c-table'>";
        mapLayerHtml += "                                <colgroup>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                </colgroup>";
        mapLayerHtml += "                                <thead>";
        mapLayerHtml += "                                    <tr>";
        mapLayerHtml += "                                        <th>관리기관</th>";
        mapLayerHtml += "                                        <th>일련번호</th>";
        mapLayerHtml += "                                        <th>공사번호</th>";
        mapLayerHtml += "                                        <th>공사구분</th>";
        mapLayerHtml += "                                        <th>관종</th>";
        mapLayerHtml += "                                        <th>구경</th>";
        mapLayerHtml += "                                        <th>연장</th>";
        mapLayerHtml += "                                    </tr>";
        mapLayerHtml += "                                </thead>";
        mapLayerHtml += "                                <tbody>";
        mapLayerHtml += "                                    <tr>";
        mapLayerHtml += "                                        <td>중부수도사업소</td>";
        mapLayerHtml += "                                        <td>1</td>";
        mapLayerHtml += "                                        <td>20060036</td>";
        mapLayerHtml += "                                        <td>폐쇄</td>";
        mapLayerHtml += "                                        <td>STS</td>";
        mapLayerHtml += "                                        <td>15</td>";
        mapLayerHtml += "                                        <td>6.71</td>";
        mapLayerHtml += "                                    </tr>";
        mapLayerHtml += "                                </tbody>";
        mapLayerHtml += "                            </table>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='map-contab-con' id='mapConTab02'>";
        mapLayerHtml += "            <ul class='map-input-list' id=''>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>일련번호</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>공사번호</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                    <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                        <div class='map-input-con'></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-separate'></div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>공사구분</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>지상지하구분</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>구경</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>수량</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input'>";
        mapLayerHtml += "                        <div class='map-input-con'>";
        mapLayerHtml += "                            <button type='button' class='c-btn01 add-current-btn' onclick=''>";
        mapLayerHtml += "                                <span>변류시설내역 추가</span>";
        mapLayerHtml += "                            </button> ";
        mapLayerHtml += "                            <button type='button' class='c-btn01 save-current-btn' onclick=''>";
        mapLayerHtml += "                                <span>변류시설내역 저장</span>";
        mapLayerHtml += "                            </button> ";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-separate'></div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input'>";
        mapLayerHtml += "                        <div class='c-table-area'>";
        mapLayerHtml += "                            <table class='c-table'>";
        mapLayerHtml += "                                <colgroup>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                </colgroup>";
        mapLayerHtml += "                                <thead>";
        mapLayerHtml += "                                    <tr>";
        mapLayerHtml += "                                        <th>관리기관</th>";
        mapLayerHtml += "                                        <th>일련번호</th>";
        mapLayerHtml += "                                        <th>공사번호</th>";
        mapLayerHtml += "                                        <th>공사구분</th>";
        mapLayerHtml += "                                        <th>지상지하구분</th>";
        mapLayerHtml += "                                        <th>구경</th>";
        mapLayerHtml += "                                        <th>수량</th>";
        mapLayerHtml += "                                    </tr>";
        mapLayerHtml += "                                </thead>";
        mapLayerHtml += "                                <tbody>";
        mapLayerHtml += "                                    <tr>";
        mapLayerHtml += "                                        <td colspan='7'>변류시설내역이 없습니다.</td>";
        mapLayerHtml += "                                    </tr>";
        mapLayerHtml += "                                </tbody>";
        mapLayerHtml += "                            </table>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "        <div class='map-contab-con' id='mapConTab03'>";
        mapLayerHtml += "            <ul class='map-input-list' id=''>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>시설구분</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>일련번호</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>공사번호</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-separate'></div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>명칭</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>규격</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>수량</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-input map-input-half'>";
        mapLayerHtml += "                        <div class='map-input-tit'><span>단위</span></div>";
        mapLayerHtml += "                        <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input'>";
        mapLayerHtml += "                        <div class='map-input-con'>";
        mapLayerHtml += "                            <button type='button' class='c-btn01 add-etc-btn' onclick=''>";
        mapLayerHtml += "                                <span>기타시설내역 추가</span>";
        mapLayerHtml += "                            </button> ";
        mapLayerHtml += "                            <button type='button' class='c-btn01 save-etc-btn' onclick=''>";
        mapLayerHtml += "                                <span>기타시설내역 저장</span>";
        mapLayerHtml += "                            </button> ";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-separate'></div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-input'>";
        mapLayerHtml += "                        <div class='c-table-area'>";
        mapLayerHtml += "                            <table class='c-table'>";
        mapLayerHtml += "                                <colgroup>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                    <col width='*'>";
        mapLayerHtml += "                                </colgroup>";
        mapLayerHtml += "                                <thead>";
        mapLayerHtml += "                                    <tr>";
        mapLayerHtml += "                                        <th>관리기관</th>";
        mapLayerHtml += "                                        <th>시설구분</th>";
        mapLayerHtml += "                                        <th>일련번호</th>";
        mapLayerHtml += "                                        <th>공사번호</th>";
        mapLayerHtml += "                                        <th>명칭</th>";
        mapLayerHtml += "                                        <th>규격</th>";
        mapLayerHtml += "                                        <th>수량</th>";
        mapLayerHtml += "                                        <th>단위</th>";
        mapLayerHtml += "                                    </tr>";
        mapLayerHtml += "                                </thead>";
        mapLayerHtml += "                                <tbody>";
        mapLayerHtml += "                                    <tr>";
        mapLayerHtml += "                                        <td colspan='8'>기타시설내역이 없습니다.</td>";
        mapLayerHtml += "                                    </tr>";
        mapLayerHtml += "                                </tbody>";
        mapLayerHtml += "                            </table>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-toptab-con' id='mapTopTab05'>";
        mapLayerHtml += "        <ul class='map-input-list' id=''>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사번호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사등록주체</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>지형지물부호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>개별번호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>보수관리코드</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>보수일자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>보수사유</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>보수내용</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>비고</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-con'>";
        mapLayerHtml += "                        <button type='button' class='c-btn01 add-remuneration-btn' onclick=''>";
        mapLayerHtml += "                            <span>보수이력 추가</span>";
        mapLayerHtml += "                        </button> ";
        mapLayerHtml += "                        <button type='button' class='c-btn01 save-remuneration-btn' onclick=''>";
        mapLayerHtml += "                            <span>보수이력 저장</span>";
        mapLayerHtml += "                        </button> ";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='c-table-area'>";
        mapLayerHtml += "                        <table class='c-table'>";
        mapLayerHtml += "                            <colgroup>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                            </colgroup>";
        mapLayerHtml += "                            <thead>";
        mapLayerHtml += "                                <tr>";
        mapLayerHtml += "                                    <th>관리기관</th>";
        mapLayerHtml += "                                    <th>공사번호</th>";
        mapLayerHtml += "                                    <th>공사등록주체</th>";
        mapLayerHtml += "                                    <th>지형지물부호</th>";
        mapLayerHtml += "                                    <th>개별번호</th>";
        mapLayerHtml += "                                    <th>보수관리코드</th>";
        mapLayerHtml += "                                    <th>보수일자</th>";
        mapLayerHtml += "                                    <th>보수사유</th>";
        mapLayerHtml += "                                    <th>보수내용</th>";
        mapLayerHtml += "                                    <th>비고</th>";
        mapLayerHtml += "                                </tr>";
        mapLayerHtml += "                            </thead>";
        mapLayerHtml += "                            <tbody>";
        mapLayerHtml += "                                <tr>";
        mapLayerHtml += "                                    <td colspan='10'>보수이력이 없습니다.</td>";
        mapLayerHtml += "                                </tr>";
        mapLayerHtml += "                            </tbody>";
        mapLayerHtml += "                        </table>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        
        //20220712 수정부분 start
        mapLayerHtml += "    <div class='map-toptab-con' id='mapTopTab06'>";
        mapLayerHtml += "        <ul class='map-input-list' id=''>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>관리기관</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사기관</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>지형지물부호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사구분</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사번호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>공사명</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도면관리번호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도면등록일</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>도면명</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>비고</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>이미지</span></div>";
        
        //map-input-con2 : 항목에 대한 설명이 있을 경우
        mapLayerHtml += "                    <div class='map-input-con map-input-con2'>";
        mapLayerHtml += "                        <div class='map-input-con-box'>";
        mapLayerHtml += "                            <div class='c-file-area'>";
        mapLayerHtml += "                                <input type='text' id='' name='' readonly=''>";
        mapLayerHtml += "                                <label><input type='file' name='' id=''>파일선택</label>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='delFile(this);'>";
        mapLayerHtml += "                                <span>삭제</span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-input-con-explain'>5MB이하 이미지파일(PNG,JPG)만 업로드 가능합니다.</div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>첨부파일</span></div>";
        
        //map-input-con2 : 항목에 대한 설명이 있을 경우
        mapLayerHtml += "                    <div class='map-input-con map-input-con2'>";
        mapLayerHtml += "                        <div class='map-input-con-box'>";
        mapLayerHtml += "                            <div class='c-file-area'>";
        mapLayerHtml += "                                <input type='text' id='' name='' readonly=''>";
        mapLayerHtml += "                                <label><input type='file' name='' id=''>파일선택</label>";
        mapLayerHtml += "                            </div>";
        mapLayerHtml += "                            <button type='button' class='c-btn01' onclick='delFile(this);'>";
        mapLayerHtml += "                                <span>삭제</span>";
        mapLayerHtml += "                            </button>";
        mapLayerHtml += "                        </div>";
        mapLayerHtml += "                        <div class='map-input-con-explain'>20MB이하 압축파일(ZIP)만 업로드 가능합니다.</div>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-con'>";
        mapLayerHtml += "                        <button type='button' class='c-btn01 add-construction-btn' onclick=''>";
        mapLayerHtml += "                            <span>준공도면 추가</span>";
        mapLayerHtml += "                        </button>";
        mapLayerHtml += "                        <button type='button' class='c-btn01 save-construction-btn' onclick=''>";
        mapLayerHtml += "                            <span>준공도면 저장</span>";
        mapLayerHtml += "                        </button>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-con'>";
        
        //only-abled : 언제나 수정 가능한 항목
        mapLayerHtml += "                        <button type='button' class='c-btn01 img-preview-btn only-abled' onclick=''>";
        mapLayerHtml += "                            <span>이미지 미리보기</span>";
        mapLayerHtml += "                        </button>";
        
        //only-abled : 언제나 수정 가능한 항목
        mapLayerHtml += "                        <button type='button' class='c-btn01 img-download-btn only-abled' onclick=''>";
        mapLayerHtml += "                            <span>이미지 다운로드</span>";
        mapLayerHtml += "                        </button>";
        
        //only-abled : 언제나 수정 가능한 항목
        mapLayerHtml += "                        <button type='button' class='c-btn01 file-download-btn only-abled' onclick=''>";
        mapLayerHtml += "                            <span>첨부파일 다운로드</span>";
        mapLayerHtml += "                        </button>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='c-table-area'>";
        mapLayerHtml += "                        <table class='c-table'>";
        mapLayerHtml += "                            <colgroup>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                                <col width='*'>";
        mapLayerHtml += "                            </colgroup>";
        mapLayerHtml += "                            <thead>";
        mapLayerHtml += "                                <tr>";
        mapLayerHtml += "                                    <th>관리기관</th>";
        mapLayerHtml += "                                    <th>공사기관</th>";
        mapLayerHtml += "                                    <th>지형지물부호</th>";
        mapLayerHtml += "                                    <th>공사구분</th>";
        mapLayerHtml += "                                    <th>공사번호</th>";
        mapLayerHtml += "                                    <th>공사명</th>";
        mapLayerHtml += "                                    <th>도면관리번호</th>";
        mapLayerHtml += "                                    <th>도면등록일</th>";
        mapLayerHtml += "                                    <th>도면명</th>";
        mapLayerHtml += "                                    <th>비고</th>";
        mapLayerHtml += "                                </tr>";
        mapLayerHtml += "                            </thead>";
        mapLayerHtml += "                            <tbody>";
        mapLayerHtml += "                                <tr>";
        mapLayerHtml += "                                    <td colspan='10'>준공도면이 없습니다.</td>";
        mapLayerHtml += "                                </tr>";
        mapLayerHtml += "                            </tbody>";
        mapLayerHtml += "                        </table>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        //20220712 수정부분 end
        //20220711 수정부분 end
        
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "infoDetail04") {
        mapLayerId = "map-layer04";
        mapLayerTit = "현장정보 접수";
        
        mapLayerHtml += "<div class='map-topbtn-area'>";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 register-btn' data-detail-idx='' onclick='openMapLayer(this,\"infoDetail04\");'>";
        mapLayerHtml += "        <span>신규</span>";
        mapLayerHtml += "    </button> ";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "    <button type='button' class='c-btn01 modify-btn' onclick='setMapDetailModify(this);'>";
            mapLayerHtml += "        <span>수정</span>";
            mapLayerHtml += "    </button> ";
            mapLayerHtml += "    <button type='button' class='c-btn01 delete-btn' onclick=''>";
            mapLayerHtml += "        <span>삭제</span>";
            mapLayerHtml += "    </button> ";
        }
        
        mapLayerHtml += "    <button type='button' class='c-btn01 save-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " onclick=''>";
        mapLayerHtml += "        <span>저장</span>";
        mapLayerHtml += "    </button> ";

        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 mr-auto-btn cancel-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " data-detail-idx='" + dataDetailIdx + "' onclick='openMapLayer(this,\"infoDetail04\");'>";
        mapLayerHtml += "        <span>취소</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "    <button type='button' class='c-btn01 list-btn' onclick='openMapLayer(this,\"infoList04\");'>";
        mapLayerHtml += "        <span>목록</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-list-area map-info-detail-area'>";
        mapLayerHtml += "    <ul class='map-input-list' id=''>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-con'>";
        mapLayerHtml += "                    <button type='button' class='c-btn01 setposition-btn' onclick=''>";
        mapLayerHtml += "                        <span>위치설정</span>";
        mapLayerHtml += "                    </button> ";
        
        //20220711 수정부분 start
        //only-abled : 언제나 수정 가능한 항목
        mapLayerHtml += "                    <button type='button' class='c-btn01 position-btn only-abled' onclick=''>";
        //20220711 수정부분 end
        
        mapLayerHtml += "                        <span>위치확인</span>";
        mapLayerHtml += "                    </button> ";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>현장정보구분</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>현장정보주소</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>블록코드</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-separate'></div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>담당자기관</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>담당자명</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>담당자연락처</span></div>";
        mapLayerHtml += "                <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-separate'></div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "            <div class='map-input'>";
        mapLayerHtml += "                <div class='map-input-tit'><span>이미지</span></div>";
        mapLayerHtml += "                <div class='map-input-con'>";
        mapLayerHtml += "                    <div class='c-file-area'>";
        mapLayerHtml += "                        <input type='text' id='' name='' readonly=''>";
        mapLayerHtml += "                        <label><input type='file' name='' id=''>파일선택</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <button type='button' class='c-btn01' onclick='delFile(this);'>";
        mapLayerHtml += "                        <span>삭제</span>";
        mapLayerHtml += "                    </button>";
        
        //20220711 수정부분 start
        if (dataDetailIdx != "") {
            //only-abled : 언제나 수정 가능한 항목
            mapLayerHtml += "                    <button type='button' class='c-btn01 only-abled' onclick=''>";
            mapLayerHtml += "                        <span>보기</span>";
            mapLayerHtml += "                    </button>";
        }
        //20220711 수정부분 end
        
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";           
    } else if (mapLayerType == "infoDetail05") {
        mapLayerId = "map-layer04";
        mapLayerTit = "민원신고 접수";
        
        mapLayerHtml += "<div class='map-topbtn-area'>";
        
        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 register-btn' data-detail-idx='' onclick='openMapLayer(this,\"infoDetail05\");'>";
        mapLayerHtml += "        <span>신규</span>";
        mapLayerHtml += "    </button> ";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "    <button type='button' class='c-btn01 modify-btn' onclick='setMapDetailModify(this);'>";
            mapLayerHtml += "        <span>수정</span>";
            mapLayerHtml += "    </button> ";
        }
        
        mapLayerHtml += "    <button type='button' class='c-btn01 save-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " onclick=''>";
        mapLayerHtml += "        <span>저장</span>";
        mapLayerHtml += "    </button> ";

        //data-detail-idx : 정보 인덱스번호 (값이 있으면 정보수정창, 없으면 정보추가창이 노출)
        mapLayerHtml += "    <button type='button' class='c-btn01 mr-auto-btn cancel-btn'" + (dataDetailIdx != "" ? " disabled" : "") + " data-detail-idx='" + dataDetailIdx + "' onclick='openMapLayer(this,\"infoDetail05\");'>";
        mapLayerHtml += "        <span>취소</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "    <button type='button' class='c-btn01 list-btn' onclick='openMapLayer(this,\"infoList05\");'>";
        mapLayerHtml += "        <span>목록</span>";
        mapLayerHtml += "    </button> ";
        mapLayerHtml += "</div>";
        mapLayerHtml += "<div class='map-list-area map-info-detail-area'>";
        mapLayerHtml += "    <div class='map-toptab-area'>";
        mapLayerHtml += "        <ul class='map-toptab-list'>";
        mapLayerHtml += "            <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "                <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTab(this);'>민원신고지점</a>";
        mapLayerHtml += "            </li>";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "            <li>";
            
            //20220713 수정부분 start
            mapLayerHtml += "                <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTab(this);'>누수포상금관리</a>";
            //20220713 수정부분 end
            
            mapLayerHtml += "            </li>";
        }
        
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "        <ul class='map-input-list' id=''>";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>접수번호</span></div>";
            
            //only-disabled : 수정 불가능한 항목
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>접수일자</span></div>";

            //only-disabled : 수정 불가능한 항목
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input only-disabled' readonly disabled autocomplete='off'></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "            </li>";
        }
        
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>민원종류</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>민원일자</span></div>";
            
            //only-disabled : 수정 불가능한 항목
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input only-disabled' readonly disabled autocomplete='off'></div>";
            mapLayerHtml += "                </div>";
        } else {
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>민원일자</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
            mapLayerHtml += "                </div>";
        }
        
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>민원인성명</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>민원인구분</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>민원내용</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>일반전화번호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>휴대전화번호</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>접수자관리기관</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name='' class='only-disabled' disabled><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>접수자성명</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>접수자연락처</span></div>";
            
            //only-disabled : 수정 불가능한 항목
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
            mapLayerHtml += "                </div>";
        } else {
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>접수자연락처</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
            mapLayerHtml += "                </div>";
        }
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>담당자관리기관</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>담당자성명</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>담당자연락처</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>이첩여부</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><input type='checkbox' id='transferCheck' name=''><label for='transferCheck'>이첩</label></div>";
            mapLayerHtml += "                </div>";
        } else {
            //map-input-blank : 항목이 없을 경우
            mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
            mapLayerHtml += "                    <div class='map-input-con'></div>";
            mapLayerHtml += "                </div>";
        }
        
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>시공업체</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>지시사항</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <div class='map-input'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>조치사항</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "            </li>";
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>현재상태</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>공사완료일자</span></div>";
            
            //only-disabled : 수정 불가능한 항목
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input only-disabled' readonly disabled autocomplete='off'></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "            </li>";
        }
        
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>단수예상종료일자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-separate'></div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-con'>";
        mapLayerHtml += "                        <button type='button' class='c-btn01 setposition-btn' onclick=''>";
        mapLayerHtml += "                            <span>신고지점설정</span>";
        mapLayerHtml += "                        </button> ";
        
        //20220711 수정부분 start
        //only-abled : 언제나 수정 가능한 항목
        mapLayerHtml += "                        <button type='button' class='c-btn01 position-btn only-abled' onclick=''>";
        //20220711 수정부분 end
        
        mapLayerHtml += "                            <span>신고지점확인</span>";
        mapLayerHtml += "                        </button> ";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>신고지점주소</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>블록코드</span></div>";
        
        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        
        if (dataDetailIdx != "") {
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <div class='map-separate'></div>";
            mapLayerHtml += "            </li>";
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>배관용도</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>배관구경</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "            </li>";
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>노후관유형</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>누수발생부위</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "            </li>";
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>수리내용</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>누수원인</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "            </li>";
            mapLayerHtml += "            <li>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>배관종류</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "                <div class='map-input map-input-half'>";
            mapLayerHtml += "                    <div class='map-input-tit'><span>누수량</span></div>";
            mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
            mapLayerHtml += "                </div>";
            mapLayerHtml += "            </li>";
        }
        
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        
        //20220713 수정부분 start
        mapLayerHtml += "    <div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "        <ul class='map-input-list' id=''>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>접수번호</span></div>";

        //only-disabled : 수정 불가능한 항목
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='only-disabled' disabled></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>민원인구분</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>포상금 지급구분</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>포상금 유형</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>포상금 처리결과</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>포상금 지급방법</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><select id='' name=''><option value=''>선택</option></select></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>포상금 지급금액</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>포상금 지급일자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name='' class='c-date-input' readonly autocomplete='off'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-input map-input-half'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span>포상금 담당자</span></div>";
        mapLayerHtml += "                    <div class='map-input-con'><input type='text' id='' name=''></div>";
        mapLayerHtml += "                </div>";
        
        //map-input-blank : 항목이 없을 경우
        mapLayerHtml += "                <div class='map-input map-input-half map-input-blank'>";
        mapLayerHtml += "                    <div class='map-input-tit'><span></span></div>";
        mapLayerHtml += "                    <div class='map-input-con'></div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "    </div>";
        //20220713 수정부분 end
        
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "layerSetting") {
        mapLayerId = "map-layer05";
        
        //20220713 수정부분 start
        mapLayerTit = "레이어 추가/제거";
        
        mapLayerHtml += "<div class='map-setting-area'>";
        mapLayerHtml += "    <div class='map-setting'>";
        
        //map-setting-selected-item : 선택한 레이어 목록
        mapLayerHtml += "        <div class='map-setting-item map-setting-selected-item'>";
        mapLayerHtml += "            <div class='map-setting-top'>";
        mapLayerHtml += "                <div class='map-setting-top-tit'>";
        mapLayerHtml += "                    <div class='map-setting-top-txt'>사용자 그룹</div>";
        mapLayerHtml += "                    <div class='map-setting-top-btn'>";
        mapLayerHtml += "                        <button type='button' onclick='addMapLayerUserGroup(this);'>";
        mapLayerHtml += "                            <span><img src='img/content-save.svg' alt='저장'></span>";
        mapLayerHtml += "                        </button>";
        mapLayerHtml += "                        <button type='button' onclick=''>";
        mapLayerHtml += "                            <span><img src='img/delete.svg' alt='삭제'></span>";
        mapLayerHtml += "                        </button>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-setting-top-input'>";
        mapLayerHtml += "                    <select name='' id=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                        <option value='현재지도' selected>현재지도</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-setting-tit'>";
        mapLayerHtml += "                <div class='map-setting-name'>선택한 레이어 목록</div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <ul class='map-setting-list'></ul>";
        mapLayerHtml += "        </div>";

        //map-setting-all-item : 상수그룹 레이어 목록
        mapLayerHtml += "        <div class='map-setting-item map-setting-all-item'>";
        mapLayerHtml += "            <div class='map-setting-top'>";
        mapLayerHtml += "                <div class='map-setting-top-tit'>";
        mapLayerHtml += "                    <div class='map-setting-top-txt'>시스템 그룹</div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "                <div class='map-setting-top-input'>";
        mapLayerHtml += "                    <select name='' id=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                        <option value='상수' selected>상수</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='map-setting-tit'>";
        mapLayerHtml += "                <div class='map-setting-name'><span id=''>상수</span> 그룹 레이어 목록</div>";
        
        mapLayerHtml += "                <div class='map-setting-check'>";
        mapLayerHtml += "                    <button type='button' class='map-setting-check-btn' onclick='setMapLayerCheckAll(this,\"on\");'>";
        mapLayerHtml += "                        <span><img src='img/checkbox-marked-outline.svg' alt='전체체크'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                    <button type='button' class='map-setting-check-btn' onclick='setMapLayerCheckAll(this,\"off\");'>";
        mapLayerHtml += "                        <span><img src='img/checkbox-blank-outline.svg' alt='전체체크해제'></span>";
        mapLayerHtml += "                    </button>";
        mapLayerHtml += "                </div>";
        
        /*mapLayerHtml += "                <div class='map-setting-check only-check'>";
        
        //layerCheckAll : 해당 체크박스를 체크/체크해제하면 체크박스 아이디가 'layerCheck'로 시작되는 체크박스 모두 체크/체크해제 함 -->
        mapLayerHtml += "                    <input type='checkbox' id='layerCheckAll' name=''>";
        mapLayerHtml += "                    <label for='layerCheckAll'></label>";
        mapLayerHtml += "                </div>";*/
        mapLayerHtml += "            </div>";
        //20220713 수정부분 end
        
        mapLayerHtml += "            <ul class='map-setting-list'>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck00'>가압구역</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck00' name=''>";
        mapLayerHtml += "                        <label for='layerCheck00'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck01'>가압장</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck01' name=''>";
        mapLayerHtml += "                        <label for='layerCheck01'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck02'>감압구역</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck02' name=''>";
        mapLayerHtml += "                        <label for='layerCheck02'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck03'>계획관로</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck03' name=''>";
        mapLayerHtml += "                        <label for='layerCheck03'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck04'>급수관로</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck04' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck04'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck05'>급수구역</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck05' name=''>";
        mapLayerHtml += "                        <label for='layerCheck05'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck06'>급수취약지구</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck06' name=''>";
        mapLayerHtml += "                        <label for='layerCheck06'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck07'>급수탑</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck07' name=''>";
        mapLayerHtml += "                        <label for='layerCheck07'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck08'>기타변류</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck08' name=''>";
        mapLayerHtml += "                        <label for='layerCheck08'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck09'>누수불출수지점</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck09' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck09'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck10'>맨홀</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck10' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck10'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck11'>상수관로</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck11' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck11'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck12'>상수관로심도</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck12' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck12'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck13'>소화전</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck13' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck13'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck14'>수도전</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck14' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck14'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck15'>수압측정지점</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck15' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck15'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck16'>수위측정지점</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck16' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck16'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck17'>수질측정지점</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck17' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck17'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck18'>유량계</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck18' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck18'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck19'>이미지지점</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck19' name=''>";
        mapLayerHtml += "                        <label for='layerCheck19'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "                <li>";
        mapLayerHtml += "                    <div class='map-setting-name'>";
        mapLayerHtml += "                        <label for='layerCheck20'>제수변</label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                    <div class='map-setting-check only-check'>";
        mapLayerHtml += "                        <input type='checkbox' id='layerCheck20' name='' checked>";
        mapLayerHtml += "                        <label for='layerCheck20'></label>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </li>";
        mapLayerHtml += "            </ul>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-setting-btn'>";
        mapLayerHtml += "        <button type='button' class='c-btn01' onclick=''>";
        mapLayerHtml += "            <span>확인</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    } else if (mapLayerType == "waterCut") {
        mapLayerId = "map-layer06";
        mapLayerTit = "단수분석";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTabGrid(this,\"waterCut01\");'>단수수용가</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTabGrid(this,\"waterCut02\");'>단수제수변</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab03' onclick='setMapTopTabGrid(this,\"waterCut03\");'>단수상수관</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='c-btn01 ml-auto-btn' onclick='getDynamicGridExcel(\"mapWatercutGrid\");'>";
        mapLayerHtml += "            <span>엑셀</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-watercut-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "        <div class='dynamic-grid-area' id='map-watercut-grid-area'></div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='c-btn01 ml-auto-btn' onclick='getDynamicGridExcel(\"mapWatercutGrid\");'>";
        mapLayerHtml += "            <span>엑셀</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-watercut-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "        <div class='dynamic-grid-area' id='map-watercut-grid-area'></div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
        
        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab03'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='c-btn01 ml-auto-btn' onclick='getDynamicGridExcel(\"mapWatercutGrid\");'>";
        mapLayerHtml += "            <span>엑셀</span>";
        mapLayerHtml += "        </button> ";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-list-area map-watercut-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "        <div class='dynamic-grid-area' id='map-watercut-grid-area'></div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
        
    //20220719 수정부분 start    
    } else if (mapLayerType == "waterSupply") {
        mapLayerId = "map-layer07";
        mapLayerTit = "수용가 정보";
        
        mapLayerHtml += "<div class='map-toptab-area'>";
        mapLayerHtml += "    <ul class='map-toptab-list'>";
        mapLayerHtml += "        <li>";
        
        //data-tab-id : 탭 클릭시 해당 아이디의 내용을 노출
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab01' onclick='setMapTopTabGrid(this,\"waterSupply01\");'>지역별 수도전수</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab02' onclick='setMapTopTabGrid(this,\"waterSupply02\");'>블록별 수도전수</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "        <li>";
        mapLayerHtml += "           <a href='javascript:void(0);' data-tab-id='mapTopTab03' onclick='setMapTopTabGrid(this,\"waterSupply03\");'>신설 및 폐전</a>";
        mapLayerHtml += "        </li>";
        mapLayerHtml += "    </ul>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab01'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='search-btn' onclick='setMapListSearch(this);'>";
        mapLayerHtml += "            <span>검색</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "        <button type='button' class='reload-btn' onclick='setMapWatersupplyGrid(this,\"waterSupply01\");'>";
        mapLayerHtml += "            <span>새로고침</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "        <button type='button' class='excel-btn' onclick='getDynamicGridExcel(\"mapWatersupplyGrid\");'>";
        mapLayerHtml += "            <span>엑셀다운</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-topsearch-area'>";
        mapLayerHtml += "        <ul class='map-topsearch-list'>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>등록구</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>행정동</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>사업소</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>관리기관</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "        <button type='button' class='c-btn01' onclick='setMapListSearchResult(this,\"waterSupply01\")'>";
        mapLayerHtml += "            <span>검색</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "    </div>";        
        mapLayerHtml += "    <div class='map-list-area map-watersupply-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "        <div class='dynamic-grid-area' id='map-watersupply-grid-area'></div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";

        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab02'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='search-btn' onclick='setMapListSearch(this);'>";
        mapLayerHtml += "            <span>검색</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "        <button type='button' class='reload-btn' onclick='setMapWatersupplyGrid(this,\"waterSupply02\");'>";
        mapLayerHtml += "            <span>새로고침</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "        <button type='button' class='excel-btn' onclick='getDynamicGridExcel(\"mapWatersupplyGrid\");'>";
        mapLayerHtml += "            <span>엑셀다운</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-topsearch-area'>";
        mapLayerHtml += "        <ul class='map-topsearch-list'>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>블록코드</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>관리기관</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "        <button type='button' class='c-btn01' onclick='setMapListSearchResult(this,\"waterSupply02\")'>";
        mapLayerHtml += "            <span>검색</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "    </div>";        
        mapLayerHtml += "    <div class='map-list-area map-watersupply-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "        <div class='dynamic-grid-area' id='map-watersupply-grid-area'></div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
        
        mapLayerHtml += "<div class='map-toptab-con' id='mapTopTab03'>";
        mapLayerHtml += "    <div class='map-topbtn-area'>";
        mapLayerHtml += "        <button type='button' class='search-btn' onclick='setMapListSearch(this);'>";
        mapLayerHtml += "            <span>검색</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "        <button type='button' class='reload-btn' onclick='setMapWatersupplyGrid(this,\"waterSupply03\");'>";
        mapLayerHtml += "            <span>새로고침</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "        <button type='button' class='excel-btn' onclick='getDynamicGridExcel(\"mapWatersupplyGrid\");'>";
        mapLayerHtml += "            <span>엑셀다운</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "    <div class='map-topsearch-area'>";
        mapLayerHtml += "        <ul class='map-topsearch-list'>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>등록구</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>행정동</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value=''>선택</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li class='w100'>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>조회기간</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <div class='c-date-area'>";
        mapLayerHtml += "                        <input type='text' id='startDate' name='' class='c-date-input' readonly placeholder='시작일선택' autocomplete='off'>";
        mapLayerHtml += "                        <span class='separate'>-</span>";
        mapLayerHtml += "                        <input type='text' id='endDate' name='' class='c-date-input' readonly placeholder='종료일선택' autocomplete='off'>";
        mapLayerHtml += "                    </div>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "            <li class='w100'>";
        mapLayerHtml += "                <div class='map-topsearch-tit'>신설 및 폐전</div>";
        mapLayerHtml += "                <div class='map-topsearch-con'>";
        mapLayerHtml += "                    <input type='checkbox' id='createCheck' name=''><label for='createCheck'>신설</label>";
        mapLayerHtml += "                    <input type='checkbox' id='closeCheck' name=''><label for='closeCheck'>폐전</label>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </li>";
        mapLayerHtml += "        </ul>";
        mapLayerHtml += "        <button type='button' class='c-btn01' onclick='setMapListSearchResult(this,\"waterSupply03\")'>";
        mapLayerHtml += "            <span>검색</span>";
        mapLayerHtml += "        </button>";
        mapLayerHtml += "    </div>";        
        mapLayerHtml += "    <div class='map-list-area map-watersupply-list-area'>";
        
        //dynamic-grid-area : 동적 그리드 그리기
        mapLayerHtml += "        <div class='dynamic-grid-area' id='map-watersupply-grid-area'></div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</div>";
    //20220719 수정부분 end
        
    //20220926 수정부분 start
    } else if (mapLayerType == "screenshot") {
        mapLayerId = "map-layer08";
        mapLayerTit = "인쇄하기";
        
        mapLayerHtml += "<section class='c-wrap c-search-wrap'>";
        mapLayerHtml += "    <div class='c-search-aside-mask'></div>";
        mapLayerHtml += "    <div class='c-search-aside-btn'></div>";
        mapLayerHtml += "    <aside class='aside'>";
        mapLayerHtml += "        <h1 class='not-view'>aside</h1>";
        
        //aside-btn-area : 검색 버튼
        mapLayerHtml += "        <div class='aside-btn-area'>";
        
        //20220928 수정부분 start
        mapLayerHtml += "            <button type='button' class='c-btn01 aside-btn print-btn' onclick=''>";
        //20220928 수정부분 end
        
        mapLayerHtml += "                <span>인쇄하기</span>";
        mapLayerHtml += "            </button>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </aside>";
        mapLayerHtml += "    <div class='c-search-area'>";
        mapLayerHtml += "        <div class='c-content-area'>";
        mapLayerHtml += "            <section class='c-list-area'>";
        
        //map-screenshot : 화면 캡쳐 canvas
        mapLayerHtml += "                <div class='map-screenshot-area' id='map-screenshot'></div>";
        mapLayerHtml += "            </section>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</section>";
    } else if (mapLayerType == "fileSave") {
        mapLayerId = "map-layer08";
        mapLayerTit = "파일저장";
        
        mapLayerHtml += "<section class='c-wrap c-search-wrap'>";
        mapLayerHtml += "    <div class='c-search-aside-mask'></div>";
        mapLayerHtml += "    <div class='c-search-aside-btn'></div>";
        mapLayerHtml += "    <aside class='aside'>";
        mapLayerHtml += "        <h1 class='not-view'>aside</h1>";
        
        //aside-date-area : 검색할 조건 선택
        mapLayerHtml += "        <div class='aside-search-area'>";
        mapLayerHtml += "            <div class='aside-search-item'>";
        mapLayerHtml += "                <div class='aside-search-item-tit'>파일명</div>";
        mapLayerHtml += "                <div class='aside-search-item-con'>";
        mapLayerHtml += "                    <input type='text' id='' name='' placeholder='파일명' />";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='aside-search-item'>";
        mapLayerHtml += "                <div class='aside-search-item-tit'>페이지 설정</div>";
        mapLayerHtml += "                <div class='aside-search-item-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value='A4가로 - 지도'>A4가로 - 지도</option>";
        mapLayerHtml += "                        <option value='A4세로 - 지도'>A4세로 - 지도</option>";
        mapLayerHtml += "                        <option value='A3가로 - 지도'>A3가로 - 지도</option>";
        mapLayerHtml += "                        <option value='A3세로 - 지도'>A3세로 - 지도</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "            <div class='aside-search-item'>";
        mapLayerHtml += "                <div class='aside-search-item-tit'>파일 형식</div>";
        mapLayerHtml += "                <div class='aside-search-item-con'>";
        mapLayerHtml += "                    <select id='' name=''>";
        mapLayerHtml += "                        <option value='PDF'>PDF</option>";
        mapLayerHtml += "                        <option value='PNG'>PNG</option>";
        mapLayerHtml += "                        <option value='JPG'>JPG</option>";
        mapLayerHtml += "                    </select>";
        mapLayerHtml += "                </div>";
        mapLayerHtml += "            </div>";
        mapLayerHtml += "        </div>";
        
        //aside-btn-area : 검색 버튼
        mapLayerHtml += "        <div class='aside-btn-area'>";
        mapLayerHtml += "            <button type='button' class='c-btn01 aside-btn' onclick=''>";
        mapLayerHtml += "                <span>파일저장</span>";
        mapLayerHtml += "            </button>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </aside>";
        mapLayerHtml += "    <div class='c-search-area'>";
        mapLayerHtml += "        <div class='c-content-area'>";
        mapLayerHtml += "            <section class='c-list-area'>";
        mapLayerHtml += "                <div class='map-screenshot-area'></div>";
        mapLayerHtml += "            </section>";
        mapLayerHtml += "        </div>";
        mapLayerHtml += "    </div>";
        mapLayerHtml += "</section>";
    //20220926 수정부분 end
    }
    
    //20220926 수정부분 start
    if (mapLayerId == "map-layer00") {
        if ($(".map-layer08").hasClass("on")) {
            closeMapLayer($(".map-layer08").find(".map-layer-box").find(".map-layer-tit-area").find(".map-layer-tit-btn").find(".map-close-btn"));
        }
    } else if (mapLayerId == "map-layer08") {
        if ($(".map-layer00").hasClass("on")) {
            closeMapLayer($(".map-layer00").find(".map-layer-box").find(".map-layer-tit-area").find(".map-layer-tit-btn").find(".map-close-btn"));
        }
    }
    //20220926 수정부분 end
    
    //20220708 수정부분 start
    var dataOpenCnt = (parseInt($("." + mapLayerId).attr("data-open-cnt")) > 0) ? parseInt($("." + mapLayerId).attr("data-open-cnt")) : 0;
    
    //20220803 수정부분 start
    $("." + mapLayerId).css({width:"",height:""});
    $("." + mapLayerId).attr("data-resize-flag","N");
    $("." + mapLayerId).removeClass("map-long-layer map-short-layer map-shorter-layer");
    //20220803 수정부분 end
    
    //20220712 수정부분 start
    //20220926 수정부분 start
    if ((mapLayerId == "map-layer00" && mapLayerType != "layer") || mapLayerId == "map-layer08") {
    //20220926 수정부분 end
        
        $("." + mapLayerId).css({top:"",left:""});
        
        $(".c-map .map-icon-list>li").removeClass("on");
        $(obj).closest("li").addClass("on");
    } else if (mapLayerType == "layer") {
        $("." + mapLayerId).css({top:"0",left:"0"});
        
        $(".c-map .map-icon-list>li").removeClass("on");
        $(obj).closest("li").addClass("on");
        
    //20220719 수정부분 start ('mapLayerType == "waterSupply"' 조건 추가)
    } else if ((mapLayerType.indexOf("ledgerList") > -1 || mapLayerType.indexOf("ledgerDetail") > -1 || mapLayerType.indexOf("infoList") > -1 || mapLayerType.indexOf("infoDetail") > -1 || mapLayerType == "layerSetting" || mapLayerType == "waterCut" || mapLayerType == "waterSupply") && !$("." + mapLayerId).hasClass("on")) {
    //20220719 수정부분 end
        
        var mapLayerTop = (winWidth < 576) ? "10px" : "15px";
        var mapLayerLeft = (winWidth < 576) ? "10px" : "15px";
        
        if (winWidth > 1199 && $(".map-layer-wrap.on .map-layer-box .map-layer-con-area .map-layer-list-area").length == 0) {
            mapLayerLeft = "57px";
        } else if (winWidth > 1199 && $(".map-layer-wrap.on .map-layer-box .map-layer-con-area .map-layer-list-area").length > 0) {
            //20220713 수정부분 start
            mapLayerLeft = "375px";
            //20220713 수정부분 end
        }
        
        $("." + mapLayerId).css({top:mapLayerTop,left:mapLayerLeft});
    }
    //20220712 수정부분 end
    
    //20220711 수정부분 start
    var maxIndex = 13;
    $(".map-layer-wrap.on").each(function() {
        if (parseInt($(this).attr("data-max-index")) >= maxIndex) {
            maxIndex = parseInt($(this).attr("data-max-index")) + 1;
        }
    });
    
    /*$(".map-layer-wrap").css("z-index", 13);
    $("." + mapLayerId).css("z-index", 15);*/
    $("." + mapLayerId).css("z-index", maxIndex);
    $("." + mapLayerId).attr("data-max-index", maxIndex);
    //20220711 수정부분 end
    
    $("." + mapLayerId).attr("data-open-cnt",(dataOpenCnt + 1));
    //20220708 수정부분 end
    
    $("." + mapLayerId).find(".map-layer-tit").html(mapLayerTit);
    $("." + mapLayerId).find(".map-layer-con-area").html(mapLayerHtml);
    
    $("." + mapLayerId).removeClass("hide");
    $("." + mapLayerId).find(".map-show-btn").find("img").attr("src","img/icon-hide.png");
    $("." + mapLayerId).addClass("on");
    
    if (mapLayerType == "search") {
        $("." + mapLayerId + " .map-search-select-list input[type='radio']").eq(0).prop("checked",true);
        
        selMapSearchSelect($("." + mapLayerId + " .map-search-select-list input[type='radio']").eq(0));
    } else if (mapLayerType == "layer") {
        //20220713 수정부분 start
        setMapLayerCheck($("." + mapLayerId + " .map-layer-list-area"),"start");
        //20220713 수정부분 end
    } else if (mapLayerType.indexOf("ledgerList") > -1) {
        setMapLedgerGrid($("." + mapLayerId + " .map-ledger-list-area"),mapLayerType);
    } else if (mapLayerType.indexOf("infoList") > -1) {
        setMapInfoGrid($("." + mapLayerId + " .map-info-list-area"),mapLayerType);
    } else if (mapLayerType.indexOf("infoDetail") > -1 && dataDetailIdx != "") {
        //20220711 수정부분 start
        $("." + mapLayerId + " .map-input-list").find("input:not(.only-abled),select:not(.only-abled),button:not(.only-abled)").prop("disabled",true);
        //20220711 수정부분 end
    } else if (mapLayerType == "layerSetting") {
        //20220713 수정부분 start
        setMapSettingCheck($("." + mapLayerId + " .map-setting-area"),"start");
        //20220713 수정부분 end
    }
    
    //20220803 수정부분 start    
    $("." + mapLayerId).resize(function() {
        $(this).attr("data-resize-flag","Y");
        
        if (mapLayerId == "map-layer01" || mapLayerId == "map-layer03" || mapLayerId == "map-layer07") {
            if ($(this).width() < 494) {
                $(this).addClass("map-shorter-layer");
                $(this).removeClass("map-short-layer");
            } else if ($(this).width() < 940) {
                $(this).addClass("map-short-layer");
                $(this).removeClass("map-shorter-layer");
            } else {
                $(this).removeClass("map-short-layer map-shorter-layer");
            }
        } else if (mapLayerId == "map-layer02") {
            if ($(this).width() > 940) {
                $(this).addClass("map-long-layer");
            } else {
                $(this).removeClass("map-long-layer");
            }
        } else if (mapLayerId == "map-layer04") {
            if ($(this).width() < 313) {
                $(this).addClass("map-shorter-layer");
                $(this).removeClass("map-short-layer");
            } else if ($(this).width() < 480) {
                $(this).addClass("map-short-layer");
                $(this).removeClass("map-shorter-layer");
            } else {
                $(this).removeClass("map-short-layer map-shorter-layer");
            }
        }
    });
    //20220803 수정부분 end
    
    //파일선택시 파일명 추출
    $(".c-file-area input[type='file']").on("change", function() {
        var filename = "";
        
        if (window.FileReader) {
            //기본 브라우저
            filename = $(this)[0].files[0].name;
        } else {
            //old IE
            filename = $(this).val().split('/').pop().split('\\').pop();
        }
        
        $(this).closest(".c-file-area").find("input[type='text']").val(filename);
    });
    
    //datepicker 설정
    $(".c-date-input").each(function() {
        $(this).datepicker();
    });
    
    //20220720 수정부분 start
    //datetimepicker 설정
    $(".c-datetime-input").each(function() {
        $(this).datetimepicker({
            controlType: 'select',
            oneLine: true,
            timeFormat: 'HH:mm',
            closeText: '닫기'
        });
    });
    //20220720 수정부분 end
    
    //yearpicker 설정
    if (mapLayerType.indexOf("infoDetail") > -1 && $(".yearpicker-container").length > 0) {
        $(".yearpicker-container").remove();
    }
    
    $(".c-year-input").each(function() {
        $(this).yearpicker();
    });
    
    //관망도조회 검색 셀렉트박스 옵션 보이기&숨기기
    $("." + mapLayerId + " .map-search-select").click(function() {
        showMapSearchSelect($(this));
    });
    
    //관망도조회 검색 셀렉트박스 옵션 선택
    $("." + mapLayerId + " .map-search-select-list input[type='radio']").click(function() {
        selMapSearchSelect($(this));
    });
    
    //관망도조회 검색 텍스트박스 옵션 보이기&숨기기
    $("." + mapLayerId + " .map-search-input").keyup(function() {
        showMapSearchInput($(this));
    });
    
    //관망도조회 검색 텍스트박스 옵션 선택
    $("." + mapLayerId + " .map-search-input-list input[type='radio']").click(function() {
        selMapSearchInput($(this));
    });
    
    //관망도조회 상단 탭 클릭시
    if ($("." + mapLayerId + " .map-toptab-area .map-toptab-list").length > 0) {
        if (mapLayerType == "waterCut") {
            setMapTopTabGrid($("." + mapLayerId + " .map-toptab-area .map-toptab-list>li>a").eq(0),"waterCut01");
        
        //20220719 수정부분 start
        } else if (mapLayerType == "waterSupply") {
            setMapTopTabGrid($("." + mapLayerId + " .map-toptab-area .map-toptab-list>li>a").eq(0),"waterSupply01");
        //20220719 수정부분 end
        
        } else {
            setMapTopTab($("." + mapLayerId + " .map-toptab-area .map-toptab-list>li>a").eq(0));
        }
    }
    
    //관망도조회 내용 안에 탭 클릭시
    if ($("." + mapLayerId + " .map-contab-area .map-contab-list").length > 0) {
        setMapConTab($("." + mapLayerId + " .map-contab-area .map-contab-list>li>a").eq(0));
    }
    
    //관망도조회 하위 항목 보이기&숨기기
    $("." + mapLayerId + " .map-list-area .map-list>li.parent>.map-list-tit").off().on("click",function(event) {
        if ((($(this).find("input").length > 0 && !$(event.target).is("label")) || ($(this).find("input").length == 0)) && !$(event.target).is("input")) {
            event.preventDefault();
            
            if ($(this).parent("li").hasClass("on")) {
                $(this).parent("li").removeClass("on");
            } else {
                $(this).parent("li").addClass("on");
            }
        }
    });
    
    //관망도조회 항목을 1개만 선택해야 하는 경우
    $("." + mapLayerId + " .map-list-area .map-single-list>li>.map-list-tit input[type='checkbox']").click(function() {
        if ($(this).closest(".map-single-list").children("li").children(".map-list-tit").find("input[type='checkbox']:checked").length > 1) {
            $(this).closest(".map-single-list").children("li").children(".map-list-tit").find("input[type='checkbox']").prop("checked",false);
            $(this).prop("checked",true);
        }
    });
    
    //20220713 수정부분 start
    //관망도조회 레이어 체크박스 체크시
    $("." + mapLayerId + " .map-layer-list-area .map-list>li>.map-list-tit input[type='checkbox']").click(function() {
        setMapLayerCheck($(this),"check");
    });
    
    //관망도조회 전체 체크&체크해제
    $("input[type='checkbox'][id$='All']").click(function() {
        var idName = $(this).attr("id").slice(0,-3);
        
        if (idName != "" && idName != undefined) {
            if ($(this).is(":checked")) {
                $("input[type='checkbox'][id^='" + idName + "']").prop("checked",true);
            } else {
                $("input[type='checkbox'][id^='" + idName + "']").prop("checked",false);
            }
        }
        
        //레이어 설정일 경우
        if ($(this).closest(".map-setting-all-item").length > 0) {
            setMapSettingCheck($(this),"check");
        }
    });
    //20220713 수정부분 end
    
    //관망도조회 레이어 설정 체크박스 체크시
    $("." + mapLayerId + " .map-setting-area .map-setting-all-item .map-setting-check input[type='checkbox']").click(function() {
        setMapSettingCheck($(this),"check");
    });
    
    //20220926 수정부분 start
    //좌측에 검색영역 보이기&숨기기
    $(".c-search-wrap .c-search-aside-btn").off().on("click", function() {
        if ($(this).parent(".c-search-wrap").hasClass("on")) {
            $(this).parent(".c-search-wrap").removeClass("on");
        } else {
            $(this).parent(".c-search-wrap").addClass("on");
        }
    });
    //20220926 수정부분 end
}

//관망도조회 레이어 팝업 내용 보이기&숨기기 
function showMapLayer(obj) {
    if ($(obj).closest(".map-layer-wrap").hasClass("hide")) {
        $(obj).closest(".map-layer-wrap").removeClass("hide");
        $(obj).find("img").attr("src","img/icon-hide.png");
        
        //20220803 수정부분 start
        if ($(obj).closest(".map-layer-wrap").hasClass("ui-resizable")) {
            $(obj).closest(".map-layer-wrap").resizable("option","disabled",false);
        }
        //20220803 수정부분 end
    } else {
        $(obj).closest(".map-layer-wrap").addClass("hide");
        $(obj).find("img").attr("src","img/icon-show.png");
        
        //20220803 수정부분 start
        if ($(obj).closest(".map-layer-wrap").hasClass("ui-resizable")) {
            $(obj).closest(".map-layer-wrap").resizable("option","disabled",true);
        }
        //20220803 수정부분 end
    }
}

//관망도조회 레이어 팝업 닫기
function closeMapLayer(obj) {
    //20220926 수정부분 start
    if ($(obj).closest(".map-layer-wrap").hasClass("map-layer00") || $(obj).closest(".map-layer-wrap").hasClass("map-layer08")) {
    //20220926 수정부분 end
        
        $(".c-map .map-icon-list>li").removeClass("on");
    }
    
    $(obj).closest(".map-layer-wrap").find(".map-layer-tit").html("");
    $(obj).closest(".map-layer-wrap").find(".map-layer-con-area").html("");
    
    $(obj).closest(".map-layer-wrap").removeClass("on hide");
    $(obj).closest(".map-layer-wrap").find(".map-show-btn").find("img").attr("src","img/icon-hide.png");
}

//계통도 내용 보이기&숨기기
function showDiagram(obj) {
    if ($(obj).closest(".diagram-item-box").hasClass("hide")) {
        $(obj).closest(".diagram-item-box").removeClass("hide");
        $(obj).find("img").attr("src","img/icon-hide.png");
    } else {
        $(obj).closest(".diagram-item-box").addClass("hide");
        $(obj).find("img").attr("src","img/icon-show.png");
    }
}

