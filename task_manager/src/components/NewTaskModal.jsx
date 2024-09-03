import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { FaArrowRight } from "react-icons/fa";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import MyDatePicker from "./DatePicker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomRecurrence from "./CustomRecurrence";
import TimePicker from 'react-time-picker';

const API_BASE_URL = 'http://localhost:5000';

const NewTaskModal = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState(null); // Initialize as null
    const [time, setTime] = useState('10:00');
    const [priority, setPriority] = useState('');
    const [tags, setTags] = useState('');
    const [recurrence, setRecurrence] = useState('');
    const [isReminder, setIsReminder] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false); // State for modal visibility

    const handleTimeChange = (newTime) => {
        setTime(newTime);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert dueDate to ISO string if it is not null
        const formattedDueDate = dueDate ? new Date(dueDate).toISOString() : '';

        const taskData = {
            title,
            desc: details,
            reminder: isReminder ? `2024-09-06T${time}:00Z` : '', // Combine date and time if reminder is set
            dueDate: formattedDueDate, // Ensure this is properly formatted
            priority,
            labels: tags.split(',').map(tag => tag.trim()), // Split tags into array
            recurrence,
            isCompleted: false,
        };

        console.log("Task Data:", taskData); // Log the taskData to verify

        try {
            const response = await fetch(`${API_BASE_URL}/createtasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error('Failed to save the task');
            }

            setSuccessMessage('Task added successfully!'); // Set success message
            setTitle('');
            setDetails('');
            setDueDate(null);
            setTime('10:00');
            setPriority('');
            setTags('');
            setRecurrence('');
            setIsReminder(false);

            // Close the modal after a successful save
            setIsOpen(false);
        } catch (error) {
            console.log('Error saving task:', error);
        }
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                    <div className="flex items-center gap-2 justify-center">
                        <FaArrowRight />
                        <span>New Task</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-[50vw] w-full">
                    <DialogHeader>
                        <DialogTitle>Create a New Task</DialogTitle>
                        <DialogDescription>
                            <Card className="border-none shadow-none">
                                <CardHeader>
                                    {/* <CardTitle>Task Details</CardTitle>
                                    <CardDescription>Fill out the details below to create a new task.</CardDescription> */}
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700">
                                                Task Title
                                            </label>
                                            <Input
                                                id="task-title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                                                Details
                                            </label>
                                            <Textarea
                                                id="details"
                                                rows={6}
                                                className="w-full h-40"
                                                placeholder="Enter detailed description here"
                                                value={details}
                                                onChange={(e) => setDetails(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between space-x-4">
                                            <MyDatePicker onChange={(date) => setDueDate(date)} />
                                            
                                            <p>Selected Time: {time}</p>
                                            <span className="text-sm font-medium text-gray-700">
                                                <CustomRecurrence onChange={(rec) => setRecurrence(rec)} />
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-blue-600"
                                                checked={isReminder}
                                                onChange={() => setIsReminder(!isReminder)}
                                            />
                                            <span className="text-sm font-medium text-gray-700">Reminder</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                                    Priority
                                                </label>
                                                <Select
                                                    value={priority}
                                                    onValueChange={setPriority}
                                                >
                                                    <SelectTrigger id="priority" className="w-full">
                                                        <SelectValue placeholder="Priority" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Highest">Highest</SelectItem>
                                                        <SelectItem value="High">High</SelectItem>
                                                        <SelectItem value="Medium">Medium</SelectItem>
                                                        <SelectItem value="Low">Low</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                                    Tags
                                                </label>
                                                <Input
                                                    id="tags"
                                                    placeholder="Enter tags separated by commas"
                                                    value={tags}
                                                    onChange={(e) => setTags(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex justify-end space-x-4">
                                        <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className='bg-blue-600 text-white'
                                            onClick={handleSubmit}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                    {successMessage && (
                                        <p className="mt-4 text-green-600">{successMessage}</p>
                                    )}
                                </CardFooter>
                            </Card>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewTaskModal;
