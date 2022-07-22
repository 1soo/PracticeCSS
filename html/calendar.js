// 현재 날짜
let nowDate = new Date();

$(document).ready(function () {
    printButton();
    printWeekArray();
    printDates();
    sendErrorMessage();
    MonthAddSubButtonClicked();
    ToDo_date_Init();
    ToDo_input_Init();
    hideToggle();
});

// Change 버튼을 눌렀을 때 밑 윈도우 2개를 toggle()한다.
function hideToggle()
{
    $(".div_GetMemo").toggle();
    $(".button_changeWindow").click(function()
    {
        ToDo_date_Init();
        ToDo_input_Init();
        $(".div_ToDo").toggle(300);
        $(".div_GetMemo").toggle(300);
        $(".li_Selected").removeClass("li_Selected");
        $(".printWeek_Saturday").removeClass("printWeek_Saturday");
        $(".printWeek_Sunday").removeClass("printWeek_Sunday");
    })
}
// SaveMemo 버튼이 눌렸을 때 localStorage로 setItem()함.
// 키 값은 날짜와 시간, value는 시간과 장소와 메모 내용
// GetMemo 버튼이 눌렸을 때 loacalStorage로부터 getItem()함.
// SaveMemo or GetMemo 버튼이 눌렸을 때 위의 입력값들이 비어있으면 에러알림.
function sendErrorMessage()
{
    $(".button_SaveMemo").click(function()
    {
        if($("#SelectedDate").val() == "") {
            alert("날짜가 선택되어있지 않습니다.");
        }
        else if(!($("#time").val().match(/\d{2}:\d{2}/)))
        {
            alert("시간이 입력되어있지 않습니다.");
        }
        else if(!($("#place").val().match(/[a-z/A-Z/가-힣/]+/g)))
        {
            alert("장소가 입력되어있지 않습니다.");
        }
        else if(!($("#to_do").val().match(/[a-z/A-Z/가-힣/]+/g)))
        {
            alert("메모가 입력되어있지 않습니다.");
        }
        else
        {
            localStorage.setItem($("#SelectedDate").val() + "-" + $("#time").val(),
                JSON.stringify({"time": $("#time").val(), "place": $("#place").val(), "to_do": $("#to_do").val()}))
            alert("메모 저장이 완료되었습니다.");
            ToDo_date_Init();
            ToDo_input_Init();
            $(".li_Selected").removeClass("li_Selected");
        }
    });
    $(".button_GetMemo").click(function()
    {
        if($("#findDate").val() == "")
        {
            alert("날짜가 선택되어있지 않습니다.");
        }
        else if(!($("#findTime").val().match(/\d{2}:\d{2}/)))
        {
            alert("시간이 입력되어있지 않습니다.")
        }
        else
        {
            if(localStorage.getItem($("#findDate").val() + "-" + $("#findTime").val()))
            {
                const getMemo = localStorage.getItem($("#SelectedDate").val() + "-" + $("#findTime").val());
                let printMemo = JSON.parse(getMemo);
                $("#showMemo").val("time : " + printMemo.time + "\nplace: " + printMemo.place + "\nto_do : " + printMemo.to_do);
            }
            else
            {
                alert("찾으시는 날짜 또는 시간에 메모가 저장되어있지 않습니다.");
                ToDo_date_Init();
                ToDo_input_Init();
                $(".li_Selected").removeClass("li_Selected");
            }
        }
    });
}
// ToDo의 선택된 날짜 초기화
function ToDo_date_Init()
{
    $("#today_Date").text("00-00");
    $("#today_Day").text("Day");
    $("#SelectedDate").val("");
    $("#findDate").val("");
}
// ToDo의 입력값들 초기화
function ToDo_input_Init()
{
    $("#time").val("");
    $("#place").val("");
    $("#to_do").val("");
    $("#findTime").val("");
    $("#showMemo").val("");
}
// 다음달, 이번달 버튼이 눌렸을 때
function MonthAddSubButtonClicked()
{
    $("#printButton").click(function()
    {
        ToDo_date_Init();
        ToDo_input_Init();
    });
}
// 달력의 일들을 눌렀을 때
function select_li()
{
    $("ul > li").click(function(){
        if($(this).text() != '\u00a0')
        {
            $(".li_Selected").removeClass("li_Selected");
            $(this).addClass("li_Selected");
            ToDo_input_Init();
        }
        if($("#findTime").val() != "")
        {
            if(localStorage.getItem($("#findDate").var() + "-" + /\d{2}:\d{2}/))
                alert("성공");
        }
    });
}
// to_do창의 요일이 주말일 경우 색깔 변경하는 함수
function ifSaturdayNSunday(number)
{
    if(number == 6)
    {
        $(".printWeek_Sunday").removeClass("printWeek_Sunday");
        $("#today_Day").addClass("printWeek_Saturday")
    }
    else if(number == 0)
    {
        $(".printWeek_Saturday").removeClass("printWeek_Saturday");
        $("#today_Day").addClass("printWeek_Sunday")
    }
    else
    {
        $(".printWeek_Saturday").removeClass("printWeek_Saturday");
        $(".printWeek_Sunday").removeClass("printWeek_Sunday");
    }
}
// 마우스로 달력의 날짜를 클릭하면 ToDo창의 날짜를 그 날짜로 변경하는 함수
function Select_ToDoDate(obj)
{
    let WeekdayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        selected_Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), obj.innerHTML),
        // 10월 전이라면 월 앞에 0하나 붙이기
        html = (nowDate.getMonth() < 9)?"0":"";
    html += (nowDate.getMonth()+1) + "-";
    //10일 전이라면 일 앞에 0하나 붙이기
    if(obj.innerHTML < 10)
        html += "0";
    html += obj.innerHTML;

    // 선택된 날짜를 ToDo의 날짜와 요일 출력
    $("#today_Date").html(html);
    $("#today_Day").html(WeekdayArr[selected_Date.getDay()]);
    ifSaturdayNSunday(selected_Date.getDay());
    // 저장할 날짜
    $("#SelectedDate").val(selected_Date.getFullYear() + "-" + html);
    $("#findDate").val(selected_Date.getFullYear() + "-" + html);
}
// 버튼 출력 함수
function printButton()
{
    let buttonClassList = ["button_NextPrevMonth", "button_NowMonth", "button_NextPrevMonth"],
        buttonNameList = ["PrevMonth", "NowMonth", "NextMonth"],
        html = "";
    for(let i = 0; i <= 2; i++)
    {
        html += `<button onclick=printDates(${i-1}) class = ${buttonClassList[i]}>${buttonNameList[i]}</button>`;
    }
    document.getElementById("printButton").innerHTML = html;
}
// 요일 출력 함수(개별로 li 생성하는 거랑 for문으로 li생성하는 거랑 간격이 다른듯함)
function printWeekArray()
{
    // 요일 : 0~6 (일~토)
    let WeekdayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        html = "<ul>";
    for(let i = 0; i < 7; i++)
    {
        html += '<li class="li_Weekday';
        if(i == 0)
        {
            html += ' printWeek_Sunday_Calendar'
        }
        else if(i == 6)
        {
            html += ' printWeek_Saturday_Calendar'
        }
        html += `">&nbsp${WeekdayArr[i]}&nbsp</li>`;
    }
    html += "</ul>";
    $("#printWeekArray").html(html);
}
// 일 출력 함수
function printDates(num = 0)
{
    // 1일로 설정
    nowDate.setDate(1);

    // 월 설정 ( 이전 달 or 현재 달 or 다음 달)
    if(num == 0)
    {
        nowDate.setFullYear(new Date().getFullYear());
        nowDate.setMonth(new Date().getMonth());
    }
    else
    {
        nowDate.setMonth(nowDate.getMonth() + num);
    }

    // 현재 연도와 월
    let year = nowDate.getFullYear(),
        // 월 : 0~11 (1월~12월) => 밑의 month 연산에서 (month + 1)을 넣어야 함.
        month = nowDate.getMonth(),

        // 월의 마지막 날
        lastDay = new Date(year, (month + 1), 0).getDate(),

        // 월의 첫 날짜 요일
        firstWeekDay = nowDate.getDay(),

        // 월의 마지막 날 요일
        nextMonthFirstWeekDay = new Date(year, month + 1, 0).getDay(),

        // nextline 넣는 계산용 요일
        weekDay = nowDate.getDay(),

        // 출력용 변수
        html = year + "-";

    // 10월 전이라면 월 앞에 0하나 붙이기
    if(month < 9)
        html += "0";
    html += month + 1;
    $("#printYearNMonth").html(html);

    // 날짜 출력하는 ul 시작
    html = "<ul>"
    for(let i = -firstWeekDay; i < lastDay + (6 - nextMonthFirstWeekDay); i++)  // (6 - 담 달 첫 요일) = 달력 뒤 여백 채우는 수
    {
        // 월의 첫 날 앞 여백을 -으로 채우기
        if(i < 0)
        {
            html += '<li>' + '&nbsp' + '</li>';
        }
        else if(i < lastDay)
        {
            html += "<li";
            if(weekDay == 6)
            {
                html += ' class="li_Saturday"';
            }
            else if(weekDay == 0)
            {
                html += ' class="li_Sunday"';
            }
            html += ` onclick= "Select_ToDoDate(this)">${i + 1}</li>`;
            // 토요일인 날짜에 </ul><ul>추가
            weekDay++;
            if(weekDay == 7)
            {
                weekDay = 0;

                html += "</ul><ul>"
            }
        }
        else
        {
            html += '<li>' + '&nbsp' + '</li>';
        }
    }
    html += `</ul>`;

    $("#printDate").html(html);
    select_li();
}