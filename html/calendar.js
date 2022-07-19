// 현재 날짜
let nowDate = new Date();

$(document).ready(function () {
    printButton();
    printWeekArray();
    print_ToDoDefaultDate();
    printDates();
});



function sendErrorMessage()
{
    $(".input_Submit").click(function(){
        if($("#SelectedDate_down").val() == "")
        {
            alert("날짜가 선택되어있지 않습니다.");
        }
        else if($("#time").val() == "")
        {
            alert("시간이 작성되어있지 않습니다.");
        }
        else if($("#place").val() == "")
        {
            alert("장소가 작성되어있지 않습니다.");
        }
        else if($("#to_do").val() == "")
        {
            alert("메모가 작성되어있지 않습니다.");
        }
        else
        {
            alert("Submit complete");
        }
    });
}
// 선택한 li에 클래스 추가하고 제거하는 함수
function AddNRemoveClass()
{
    // 버튼 누르면 ToDo창의 데이터값들이 초기화된다.
    // 날짜를 선택하면 해당하는 날짜가 선택된다.
    $("#printButton").click(function(){
        $("#Today_Date").text("00-00");
        $("#Today_Day").text("Day");
        $("#SelectedDate_up").val("");
        $("#SelectedDate_down").val("");
        $("#Time").val("");
        $("#Place").val("");
        $("#To_Do").val("");
    });
    $("ul > li").click(function(){
        $(".li_Selected").removeClass("li_Selected");
        $(this).addClass("li_Selected");
    });
}
// ToDo 초기 데이터값 설정
function print_ToDoDefaultDate()
{
    document.getElementById("Today_Date").innerHTML = "00-00";
    document.getElementById("Today_Day").innerHTML = "Day";
}
// 마우스로 달력의 날짜를 클릭하면 ToDo창의 날짜를 그 날짜로 변경하는 함수
function Select_ToDoDate(obj)
{
    // 버튼 누르면 ToDo창의 데이터값들이 초기화된다.
    $("ul > li").click(function(){
        $("#Time").val("");
        $("#Place").val("");
        $("#To_Do").val("");
    });

    let WeekdayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        selected_Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), obj.innerHTML),
        // 10월 전이라면 월 앞에 0하나 붙이기
        html = (nowDate.getMonth() < 9)?"0":"";

    html += (selected_Date.getMonth()+1) + "-";
    //10일 전이라면 일 앞에 0하나 붙이기
    if(selected_Date.getDate() < 10)
        html += "0";
    html += selected_Date.getDate();

    // 선택된 날짜를 ToDo의 날짜와 요일 출력
    document.getElementById("Today_Date").innerHTML = html;
    document.getElementById("Today_Day").innerHTML = WeekdayArr[selected_Date.getDay()];
    // 저장할 날짜
    document.querySelector("#SelectedDate_up").value = html;
    document.querySelector("#SelectedDate_down").value = html;
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
        html += `<li class="li_Weekday">&nbsp${WeekdayArr[i]}&nbsp</li>`;
    }
    html += "</ul>";
    document.getElementById("printWeekArray").innerHTML = html;
}
// 일 출력 함수
function printDates(num = 0)
{
    AddNRemoveClass();
    sendErrorMessage();
    // 1일로 설정
    nowDate.setDate(1);

    // 월 설정 ( 이전 달 or 현재 달 or 다음 달)
    if(num == 0)
    {
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
    document.getElementById("printYearNMonth").innerHTML = html;

    // 날짜 출력하는 ul 시작
    html = "<ul>"
    for(let i = -firstWeekDay; i < lastDay + (6 - nextMonthFirstWeekDay); i++)  // (6 - 담 달 첫 요일) = 달력 뒤 여백 채우는 수
    {
        // 월의 첫 날 앞 여백을 -으로 채우기
        if(i < 0)
        {
            html += `<li>&nbsp</li>`;
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
            html += `<li>&nbsp</li>`;
        }
    }
    html += `</ul>`;

    document.getElementById("printDate").innerHTML = html;
}