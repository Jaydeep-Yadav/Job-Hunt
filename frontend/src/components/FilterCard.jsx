import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from "../components/ui/button";
import { useDispatch } from 'react-redux';
import { ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { setSearchedQuery } from '../redux/jobSlice';

const filterData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [showFilters, setShowFilters] = useState(true);
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    const clearFilters = () => {
        setSelectedValue('');
        dispatch(setSearchedQuery(''));
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-3 rounded-md shadow'>
            <div className='flex justify-between items-center mb-3'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(prev => !prev)}
                >
                    {showFilters ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </div>

            {showFilters && (
                <>
                    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                        {filterData.map((data, index) => (
                            <div key={index} className="mt-4">
                                <h1 className='font-bold text-md mb-1'>{data.fitlerType}</h1>
                                {data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </RadioGroup>

                    <Button
                        variant="outline"
                        className="mt-4 w-full flex items-center justify-center gap-2"
                        onClick={clearFilters}
                    >
                        <XCircle className="w-4 h-4" />
                        Clear Filters
                    </Button>
                </>
            )}
        </div>
    );
};

export default FilterCard;
