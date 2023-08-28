import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Header from "./Header";
import Footer from "./Footer";

function Calculator() {
    const [age, setAge] = useState({years: '--', months: '--', days: '--'});
    const [inputAge, setInputAge] = useState({years: 0, months: 0, days: 0});
    const [inputValidity, setInputValidity] = useState({ years: true, months: true, days: true });

    let calculateAge = (years, months, days) => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();
        let resYears = currentYear - years;
        let resMonths = currentMonth - months;
        let resDays = currentDay - days;
        if (resDays < 0) {
            resMonths -= 1;
            resDays += new Date(currentYear, currentMonth - 1, 0).getDate();
        }
        if (resMonths < 0) {
            resYears -= 1;
            resMonths += 12;
        }
        return { years: resYears, months: resMonths, days: resDays };
    }

    let handleInput = (event) => {
        const { name, value } = event.target;
        setInputAge((prevAge) => ({ ...prevAge, [name]: parseInt(value) }));
    }
    
    let isValidDate = (year, month, day) => {
        let invalidElements = [];

        const numericYear = parseInt(year, 10);
        const numericMonth = parseInt(month, 10);
        const numericDay = parseInt(day, 10);
    
        if (!/^\d{4}$/.test(year) || isNaN(numericYear)) invalidElements.push("year");
        if (!/^\d{1,2}$/.test(month) || isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) invalidElements.push("month");
    
        const today = new Date();
        const currentYear = today.getFullYear();
        const maxDay = new Date(numericYear, numericMonth, 0).getDate();

        if (numericYear < 1000 || numericYear > currentYear) invalidElements.push("year");
        if (isNaN(numericDay) || numericDay < 1 || numericDay > maxDay) invalidElements.push("day");

        const inputDate = new Date(numericYear, numericMonth - 1, numericDay);
        if (inputDate > today) invalidElements.push("date");

        return invalidElements;
    }
    
    let handleSubmit = () => {
        const invalidElements = isValidDate(inputAge.years, inputAge.months, inputAge.days);
        if (invalidElements.length > 0) {
            const inputValidity = {
                years: !invalidElements.includes("year") && !invalidElements.includes("date"),
                months: !invalidElements.includes("month") && !invalidElements.includes("date"),
                days: !invalidElements.includes("day") && !invalidElements.includes("date")
            };
            setInputValidity(inputValidity);
            setAge({years: '--', months: '--', days: '--'});
            return;
        }
        setInputValidity({years: true, months: true, days: true});
        let result = calculateAge(inputAge.years, inputAge.months, inputAge.days);
        setAge({years: result.years, months: result.months, days: result.days});
    }
        

    return (
        <div>
            <Header />
            <div className="mainBox">
                <Input
                    labelFor="day"
                    inputId="day"
                    inputName="days"
                    maxlength="2"
                    inputPlaceholder="DD"
                    handleChange={handleInput}
                    isValid={inputValidity.days}
                    invalidMessage="Must be a valid day"
                    />
                <Input
                    labelFor="month"
                    inputId="month"
                    inputName="months"
                    maxlength="2"
                    inputPlaceholder="MM"
                    handleChange={handleInput}
                    isValid={inputValidity.months}
                    invalidMessage="Must be a valid month"
                    />
                <Input
                    labelFor="year"
                    inputId="year"
                    inputName="years"
                    maxlength="4"
                    inputPlaceholder="YYYY"
                    handleChange={handleInput}
                    isValid={inputValidity.years}
                    invalidMessage="Must be a valid year"
                />
                <br />
                <hr></hr>
                <Button 
                    handleSubmit={handleSubmit}
                />
                <div className="result">
                    <h1><span>{age.years}</span> years</h1>
                    <h1><span>{age.months}</span> months</h1>
                    <h1><span>{age.days}</span> days</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Calculator;