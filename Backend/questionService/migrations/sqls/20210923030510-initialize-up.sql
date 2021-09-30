/* Replace with your SQL commands */

CREATE TABLE Questions (
    Id SERIAL,
    difficulty varchar(255) NOT NULL,
	category varchar(255) NOT NULL,
	question varchar(512) NOT NULL,
	externalLink varchar(255),
    PRIMARY KEY (Id)
);

INSERT INTO questions(difficulty, category, question, externalLink)
VALUES 
('easy', 'string', 'Reverse a string', ''),
('easy', 'string', 'Check if two strings are anagrams of each other', ''),
('easy', 'string', 'Count a number of vowels and consonants in a given string', ''),
('easy', 'string', 'Print all permutations of a given string', ''),
('easy', 'string', 'Check if a given string is a palindrome', ''),
('easy', 'array', 'Find the largest and smallest number in an unsorted integer array', ''),
('easy', 'array', 'Find all pairs of an integer array whose sum is equal to a given number', ''),
('easy', 'array', 'Remove all duplicates from a given array', ''),
('easy', 'array', 'Return the missing number in an array that contains integers from 1 to 100?', ''),
('easy', 'others', 'Check if a given integer is a prime number', ''),
('easy', 'others', 'Compute the first five Fibonacci numbers', ''),
('easy', 'others', 'Print all factors of a number', ''),
('medium', 'sorting', 'Sort an integer array without using the in-built sort method', ''),
('medium', 'sorting', 'Given an array A[] of integers, sort the array according to frequency of elements. That is elements that have higher frequency come first. If frequencies of two elements are same, then smaller number comes first.', 'https://practice.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency/0'),
('medium', 'linked list', 'Reverse a linked list', ''),
('medium', 'linked list', 'Remove all duplicates from a given linked list', ''),
('medium', 'trees', 'Given a tree, find the max-width and depth', ''),
('medium', 'trees', 'Determine if Two Trees are Identical', 'https://practice.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1'),
('medium', 'trees', 'Given a binary tree, find if it is height balanced or not. A tree is height balanced if difference between heights of left and right subtrees is not more than one for all nodes of tree. 
', 'https://practice.geeksforgeeks.org/problems/check-for-balanced-tree/1'),
('hard', 'dynamic programming', 'Given two strings. The task is to find the length of the longest common substring.', 'https://practice.geeksforgeeks.org/problems/coin-change2448/1'),
('hard', 'dynamic programming', 'Given an array of N integers arr[] where each element represents the max number of steps that can be made forward from that element. Find the minimum number of jumps to reach the end of the array (starting from the first element). If an element is 0, then you cannot move through that element.', ''),
('hard', 'graph', 'Given a weighted, undirected and connected graph of V vertices and E edges, Find the shortest distance of all the vertex from the source vertex S.', 'https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1'),
('hard', 'graph', 'Given a Directed Graph with V vertices (from 0 to V-1) and E edges, Find the number of strongly connected components in the graph.', 'https://practice.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1');