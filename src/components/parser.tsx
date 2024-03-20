import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import { IonButton, IonInput, IonCard, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react";

const allowedExtensions = ["csv"];

const Parser = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [brandFilter, setBrandFilter] = useState<string>("");
    const [qtyFilter, setQtyFilter] = useState<string>("");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputFile = e.target?.files?.[0];

        if (!inputFile) return;

        const fileExtension = inputFile.name.split(".").pop();

        if (!allowedExtensions.includes(fileExtension?.toLowerCase() ?? "")) {
            console.error("Please input a CSV file");
            return;
        }

        const reader = new FileReader();
        reader.onload = ({ target }) => {
            if (!target) return;
            const csv = Papa.parse(target.result as string, { header: true });
            const parsedData = csv?.data ?? [];
            setData(parsedData);
            setFilteredData(parsedData); // Initialize filtered data with all data
        };
        reader.readAsText(inputFile);
    };

    const handleFilter = () => {
        if (!data || data.length === 0) {
            console.error("No data to filter");
            return;
        }
    
        const filtered = data.filter((item) => {
            const itemName = (item["Item Name"] || "").toLowerCase();
            const brand = (item.Brand || "").toLowerCase();
            const qty = parseFloat(item["Actual Qty"]);
    
            // Fuzzy match for item name and brand
            if (
                (nameFilter && !itemName.includes(nameFilter.toLowerCase())) ||
                (brandFilter && !brand.includes(brandFilter.toLowerCase()))
            ) {
                return false;
            }
    
            // Check if quantity filter is a plain number
            if (qtyFilter && !isNaN(parseFloat(qtyFilter))) {
                const targetQty = parseFloat(qtyFilter);
                if (qty !== targetQty) return false;
            } else if (qtyFilter) {
                // Parse quantity filter expression
                let operator: string;
                let value: number;
    
                if (qtyFilter.includes(">=")) {
                    operator = ">=";
                    value = parseFloat(qtyFilter.split(">=")[1]);
                } else if (qtyFilter.includes("<=")) {
                    operator = "<=";
                    value = parseFloat(qtyFilter.split("<=")[1]);
                } else if (qtyFilter.includes(">")) {
                    operator = ">";
                    value = parseFloat(qtyFilter.split(">")[1]);
                } else if (qtyFilter.includes("<")) {
                    operator = "<";
                    value = parseFloat(qtyFilter.split("<")[1]);
                } else {
                    return false; // Invalid quantity filter expression
                }
    
                // Apply the comparison based on the operator
                switch (operator) {
                    case ">":
                        if (!(qty > value)) return false;
                        break;
                    case "<":
                        if (!(qty < value)) return false;
                        break;
                    case ">=":
                        if (!(qty >= value)) return false;
                        break;
                    case "<=":
                        if (!(qty <= value)) return false;
                        break;
                    default:
                        return false; // Invalid operator
                }
            }
    
            return true; // Passes all filters
        });
        setFilteredData(filtered);
    };
    

    return (
        <div className="ion-padding">
            <h1>Read Data On The Go</h1>
            <label htmlFor="csvInput">Select CSV File:</label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="file"
            />
            <IonButton onClick={handleFilter}>Apply Filter</IonButton>
            <div>
                <IonInput
                    type="text"
                    placeholder="Filter by Item Name (Fuzzy)"
                    value={nameFilter}
                    onIonChange={(e) => setNameFilter(e.detail.value!)}
                ></IonInput>
                <IonInput
                    type="text"
                    placeholder="Filter by Brand (Fuzzy)"
                    value={brandFilter}
                    onIonChange={(e) => setBrandFilter(e.detail.value!)}
                ></IonInput>
                <IonInput
                    type="text"
                    placeholder="Filter by Qty (e.g., >3, <=10, =5)"
                    value={qtyFilter}
                    onIonChange={(e) => setQtyFilter(e.detail.value!)}
                ></IonInput>
            </div>
            <IonGrid>
                <IonRow>
                    {filteredData.map((item, index) => (
                        <IonCol size="6" key={index}>
                            <IonCard>
                                <IonCardContent>
                                    <p>{`${item['Item Name']}`}</p>
                                    <p>{`Brand: ${item.Brand}`}</p>
                                    <p>{`Qty: ${item['Actual Qty']}`}</p>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </div>
    );
};

export default Parser;
