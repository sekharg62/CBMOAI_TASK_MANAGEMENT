import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import NewTaskModal from "./NewTaskModal";

const API_BASE_URL = 'http://localhost:5000';

const NextWeek = () => {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Utility function to get the start and end dates for next week
    const getNextWeekRange = () => {
        const today = new Date();
        const currentDay = today.getDay();
        const startOfNextWeek = new Date(today.setDate(today.getDate() + (7 - currentDay) + 1)); // Start of next week
        const endOfNextWeek = new Date(today.setDate(startOfNextWeek.getDate() + 6)); // End of next week
        return { startOfNextWeek, endOfNextWeek };
    };

    // Filter tasks for next week
    const getTasksForNextWeek = () => {
        const { startOfNextWeek, endOfNextWeek } = getNextWeekRange();
        return tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= startOfNextWeek && dueDate <= endOfNextWeek;
        });
    };

    // Reusable Task Display Component
    const TaskList = ({ tasks }) => (
        tasks.map(task => (
            <div key={task._id} className="p-2 border-b">
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.desc}</p>
                <p><strong>Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</p>
            </div>
        ))
    );

    return (
        <div>
            <Card className="w-[25vw]">
                <CardHeader>
                    <CardTitle className="text-lg">Next Week</CardTitle>
                    <CardDescription>
                        <div className="mt-4 w-1/2 bg-white text-blue-500 border border-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
                            <NewTaskModal />
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-md">Next Week Tasks</AccordionTrigger>
                                <AccordionContent>
                                    <TaskList tasks={getTasksForNextWeek()} />
                                </AccordionContent>
                            </AccordionItem>
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

export default NextWeek;
