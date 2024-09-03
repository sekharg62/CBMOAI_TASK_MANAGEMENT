import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import MyDatePicker from './DatePicker';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import NewTaskModal from "./NewTaskModal";

const API_BASE_URL = 'http://localhost:5000';

const getWeekStartDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = today.getDate() - dayOfWeek; // Get the start of the week (Sunday)
    return new Date(today.setDate(diff)).toISOString().split('T')[0];
};

const getWeekEndDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() + (6 - dayOfWeek); // Get the end of the week (Saturday)
    return new Date(today.setDate(diff)).toISOString().split('T')[0];
};

const getDayName = (date) => {
    const options = { weekday: 'long' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const ThisWeek = () => {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/tasks`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
                }
    
                const data = await response.json();
                console.log('Fetched tasks:', data); // Debugging line
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchTasks();
    }, []);

    const startOfWeek = getWeekStartDate();
    const endOfWeek = getWeekEndDate();

    // Filter tasks for the current week
    const getTasksForDay = (date) => {
        return tasks.filter(task => {
            if (!task.dueDate) return false;
            const taskDate = task.dueDate.split('T')[0];
            return taskDate === date;
        });
    };

    // Utility functions to get dates for each day of the week
    const getDatesForWeek = () => {
        const days = [];
        let date = new Date(startOfWeek);
        for (let i = 0; i < 7; i++) {
            days.push(date.toISOString().split('T')[0]);
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const weekDays = getDatesForWeek();

    // Reusable Task Display Component
    const TaskList = ({ tasks }) => (
        tasks.length > 0 ? (
            tasks.map(task => (
                <div key={task._id} className="p-2 border-b">
                    <p><strong>Title:</strong> {task.title}</p>
                    <p><strong>Description:</strong> {task.desc}</p>
                    <p><strong>Date:</strong> {task.dueDate ? task.dueDate.split('T')[0] : 'No Date'}</p>
                </div>
            ))
        ) : (
            <p>No tasks for this day</p>
        )
    );

    return (
        <div>
            <Card className="w-[20vw]">
                <CardHeader>
                    <CardTitle className="text-lg">This Week</CardTitle>
                    <CardDescription>
                        <div className="mt-4 w-1/2 bg-white text-blue-500 border border-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
                            <NewTaskModal />
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mt-8">
                        <Accordion type="single" collapsible>
                            {weekDays.map((date, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-md">{getDayName(date)}</AccordionTrigger>
                                    <AccordionContent>
                                        <TaskList tasks={getTasksForDay(date)} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </CardContent>
                <CardFooter>
                    {/* Footer content */}
                </CardFooter>
            </Card>
        </div>
    );
};

export default ThisWeek;
