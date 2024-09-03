import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import MyDatePicker from './DatePicker';


const CustomRecurrence = () => {
    const [selectedUnit, setSelectedUnit] = useState('');
    const [endsOption, setEndsOption] = useState('');
    

    const handleUnitChange = (value) => {
        setSelectedUnit(value);
    };

    const handleEndsOptionChange = (option) => {
        setEndsOption(option);
    };

    const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger>Custom Recurrence/Repeat</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Custom Recurrence</DialogTitle>
                        <DialogDescription>
                            <form action="">

                                {/* Repeat Section */}
                                <div className="flex flex-col space-y-4 mb-4">
                                    <div className="flex items-center space-x-4">
                                        <label htmlFor="repeat" className="text-sm font-medium text-gray-700">Repeat</label>
                                        <input
                                            type="number"
                                            id="repeat"
                                            className="w-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <Select id="repeat_unit" className="w-32" onValueChange={handleUnitChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Day">Day</SelectItem>
                                                <SelectItem value="Week">Week</SelectItem>
                                                <SelectItem value="Month">Month</SelectItem>
                                                <SelectItem value="Year">Year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {selectedUnit === 'Week' && (
                                        <Select id="week_day" className="w-32">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Day" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="everyday">Everyday</SelectItem>
                                                <SelectItem value="sunday">Sunday</SelectItem>
                                                <SelectItem value="monday">Monday</SelectItem>
                                                <SelectItem value="tuesday">Tuesday</SelectItem>
                                                <SelectItem value="wednesday">Wednesday</SelectItem>
                                                <SelectItem value="thursday">Thursday</SelectItem>
                                                <SelectItem value="friday">Friday</SelectItem>
                                                <SelectItem value="saturday">Saturday</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                    {selectedUnit === 'Month' && (
                                        <Select id="month_day" className="w-32">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Day" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">On every 1st of the month</SelectItem>
                                                <SelectItem value="2">On every 2nd day of the month</SelectItem>
                                                {/* Add options for all days up to 31 */}
                                                {[...Array(31).keys()].map(day => (
                                                    <SelectItem key={day + 1} value={day + 1}>
                                                        {`On every ${day + 1}${getDaySuffix(day + 1)} of the month`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                {/* Ends Section */}
                                <div className=" mt-12 space-y-4">
                                    <label htmlFor="ends" className="text-sm font-medium text-gray-700">Ends</label>

                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="never"
                                                checked={endsOption === 'never'}
                                                onChange={() => handleEndsOptionChange('never')}
                                                className="form-checkbox text-blue-600"
                                            />
                                            <label htmlFor="never" className="text-sm font-medium text-gray-700">Never</label>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="checkbox"
                                                id="on"
                                                checked={endsOption === 'on'}
                                                onChange={() => handleEndsOptionChange('on')}
                                                className="form-checkbox text-blue-600"
                                            />
                                            <label htmlFor="on" className="text-sm font-medium text-gray-700">On</label>
                                            <MyDatePicker />
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="checkbox"
                                                id="after"
                                                checked={endsOption === 'after'}
                                                onChange={() => handleEndsOptionChange('after')}
                                                className="form-checkbox text-blue-600"
                                            />
                                            <label htmlFor="after" className="text-sm font-medium text-gray-700">After</label>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="number"
                                                    id="occurence"
                                                    placeholder="Occurrence"
                                                    className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Occurrence</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button variant="secondary">Cancel</Button>
                                    <Button variant="primary">Save</Button>
                                </div>

                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CustomRecurrence;
