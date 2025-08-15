import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  CircularProgress,
  Button,
  Avatar,
  styled,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import { Iconify } from '../iconify';
import { CONFIG } from 'src/config-global';
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import axiosInstance, { endpoints } from 'src/utils/axios';
const GradientBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: 0,
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  zIndex: 1,
}));

const AnimatedMessageBubble = styled(m.div)(({ theme, type }) => ({
  maxWidth: '65%',
  padding: theme.spacing(1),
  borderRadius: type === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
  backgroundColor: type === 'user' ? 'rgba(103, 126, 234, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  color: type === 'user' ? theme.palette.common.white : theme.palette.text.primary,
  alignSelf: type === 'user' ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1),
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  lineHeight: 1.5,
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
  position: 'relative',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  background: 'transparent',
}));

const AvatarGlow = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  boxShadow: '0 0 20px rgba(103, 126, 234, 0.5)',
  border: '2px solid rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(2px)',
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  width: 56,
  height: 56,
  backgroundColor: 'rgba(103, 126, 234, 0.7)',
  backdropFilter: 'blur(4px)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(83, 106, 214, 0.8)',
    transform: 'scale(1.05)',
  },
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 20px rgba(103, 126, 234, 0.3)',
}));

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        type: 'bot',
        text: 'Hello! How can I help you today?',
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const controller = new AbortController();
    // Increase timeout to 30 seconds to accommodate slower responses
    const timeoutDuration = 30000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

    const userMessage = { type: 'user', text: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);
    scrollToBottom(); // Scroll after user message

    try {
      // Prepare conversation history
      const conversationHistory = messages
        .filter(msg => msg.type === 'user' || msg.type === 'bot')
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text || msg.html || ''
        }));

      const response = await axiosInstance.post(
        endpoints.chat,
        {
          question: inputMessage,
          // Include conversation history for context
          conversation_history: conversationHistory,
        },
        {
          signal: controller.signal,
          timeout: timeoutDuration, // Use the same timeout duration
          // Configure retry logic
          'axios-retry': {
            retries: 2, // Retry up to 2 times on failure
            retryDelay: (retryCount) => retryCount * 1000, // Wait 1s, 2s between retries
            retryCondition: (error) => {
              // Retry on network errors or 5xx server errors
              return (
                axios.isAxiosError(error) && 
                (!error.response || error.response.status >= 500)
              );
            }
          }
        }
      );
      clearTimeout(timeoutId);

      const data = response?.data;
      console.log('API Response Data:', data);

      // Helper function to format structured data
      const formatStructuredData = (text) => {
        // Check for rank list pattern (e.g., **Rank 1:** Name)
        const rankPattern = /\*\*Rank (\d+):\*\*\s*([^\n]+)/g;
        // Check for numbered list pattern (e.g., 1. Item)
        const numberedListPattern = /^(\d+)[.)]\s+(.+)$/gm;
        // Check for bulleted list pattern (e.g., - Item or * Item)
        const bulletedListPattern = /^[-*]\s+(.+)$/gm;
        // Check for key-value pairs (e.g., **Key:** Value)
        const keyValuePattern = /\*\*([^:]+):\*\*\s*([^\n]+)/g;
        // // Check for markdown tables
        const tablePattern = /(\|.*\|\n\|\s*:?-+:?\s*\|.*\n(?:\|.*\|\n)*)/;

        // Format markdown tables
        if (tablePattern.test(text)) {
          return formatMarkdownTable(text, tablePattern);
        }
        
        // Format rank lists
        if (rankPattern.test(text)) {
          return formatGenericTable(text, rankPattern, ['Rank', 'Name'], (match) => [match[1], match[2].trim()]);
        }

        // Format numbered lists
        if (numberedListPattern.test(text)) {
          return formatGenericList(text, numberedListPattern, (match) => match[2]);
        }

        // Format bulleted lists
        if (bulletedListPattern.test(text)) {
          return formatGenericList(text, bulletedListPattern, (match) => match[1]);
        }

        // Format key-value pairs as unordered list
        if (keyValuePattern.test(text)) {
          return formatKeyValueList(text, keyValuePattern);
        }

        return text;
      };

      // Helper function to format generic lists
      const formatGenericList = (text, pattern, extractFn) => {
        const items = [];
        let match;
        
        // Reset the regex lastIndex
        pattern.lastIndex = 0;
        
        while ((match = pattern.exec(text)) !== null) {
          items.push(extractFn(match));
        }

        if (items.length > 0) {
          const listHtml = `
            <div class="formatted-list">
              <ul style="padding-left: 20px; margin: 8px 0;">
                ${items.map(item => `
                  <li style="margin-bottom: 4px;">${item}</li>
                `).join('')}
              </ul>
            </div>
          `;
          return text.replace(pattern, listHtml);
        }
        
        return text;
      };

      // Helper function to format generic tables
      const formatGenericTable = (text, pattern, headers, rowExtractor) => {
        const rows = [];
        let match;
        
        // Reset the regex lastIndex
        pattern.lastIndex = 0;
        
        while ((match = pattern.exec(text)) !== null) {
          rows.push(rowExtractor(match));
        }

        if (rows.length > 0) {
          const tableHtml = `
            <div class="formatted-table">
              <style>
                .formatted-table table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 16px 0;
                  font-size: 0.9em;
                  min-width: 400px;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .formatted-table thead tr {
                  background-color: #677eea;
                  color: #ffffff;
                  text-align: left;
                  font-weight: bold;
                }
                .formatted-table th,
                .formatted-table td {
                  padding: 12px 15px;
                  border: 1px solid #dddddd;
                }
                .formatted-table tbody tr:nth-of-type(even) {
                  background-color: #f3f3f3;
                }
                .formatted-table tbody tr:last-of-type {
                  border-bottom: 2px solid #677eea;
                }
              </style>
              <table>
                <thead>
                  <tr>
                    ${headers.map(header => `<th>${header}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${rows.map(row => `
                    <tr>
                      ${row.map(cell => `<td>${cell}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `;
          
          return text.replace(pattern, tableHtml);
        }
        
        return text;
      };

      // Helper function to format key-value pairs as an unordered list
      const formatKeyValueList = (text, pattern) => {
        const items = [];
        const lines = text.trim().split('\n');
        
        // Process each line to handle different formats
        for (const line of lines) {
          // Match bold keys with or without asterisks
          const match = line.match(/^\s*\*?\s*\*\*([^:]+):\*\*\s+(.+)$/);
          if (match) {
            items.push({
              key: match[1].trim(),
              value: match[2].trim()
            });
          }
        }
        
        // If no items were found with the new format, fall back to the original pattern
        if (items.length === 0) {
          pattern.lastIndex = 0;
          let match;
          while ((match = pattern.exec(text)) !== null) {
            items.push({
              key: match[1].trim(),
              value: match[2].trim()
            });
          }
        }

        if (items.length > 0) {
          const listHtml = `
            <div class="key-value-list" style="margin: 16px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <ul style="list-style-type: none; padding: 0; margin: 0; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                ${items.map(item => `
                  <li style="padding: 12px 16px; border-bottom: 1px solid #f0f0f0; background-color: #fff;">
                    <div style="font-weight: 600; color: #2c3e50; margin-bottom: 4px;">${item.key}</div>
                    <div style="color: #34495e; line-height: 1.5;">${item.value}</div>
                  </li>
                `).join('')}
              </ul>
            </div>
          `;
          
          // Replace all key-value patterns in the text with our formatted list
          return listHtml;
        }
        
        return text;
      };

      // Helper function to format markdown tables
      const formatMarkdownTable = (text, pattern) => {
        const match = text.match(pattern);
        if (!match) return text;
        
        const tableContent = match[1];
        const rows = tableContent.trim().split('\n').map(row => 
          row.trim().split('|').map(cell => cell.trim())
        );
        
        if (rows.length < 2) return text;
        
        const headers = rows[0].filter(Boolean);
        const alignments = rows[1].filter(Boolean).map(col => {
          if (col.startsWith(':-') && col.endsWith('-:')) return 'center';
          if (col.endsWith(':')) return 'right';
          return 'left';
        });
        
        const tableHtml = `
          <div class="markdown-table">
            <style>
              .markdown-table table {
                width: 100%;
                border-collapse: collapse;
                margin: 16px 0;
                font-size: 0.9em;
                min-width: 400px;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .markdown-table thead tr {
                background-color: #677eea;
                color: #ffffff;
                text-align: left;
                font-weight: bold;
              }
              .markdown-table th,
              .markdown-table td {
                padding: 12px 15px;
                border: 1px solid #dddddd;
              }
              .markdown-table tbody tr:nth-of-type(even) {
                background-color: #f3f3f3;
              }
              .markdown-table tbody tr:last-of-type {
                border-bottom: 2px solid #677eea;
              }
            </style>
            <table>
              <thead>
                <tr>
                  ${headers.map((header, i) => 
                    `<th style="text-align: ${alignments[i] || 'left'}">${header}</th>`
                  ).join('')}
                </tr>
              </thead>
              <tbody>
                ${rows.slice(2).map(row => `
                  <tr>
                    ${row.filter((_, i) => i > 0 && i < row.length - 1).map((cell, i) => 
                      `<td style="text-align: ${alignments[i] || 'left'}">${cell || ''}</td>`
                    ).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
        
        return text.replace(pattern, tableHtml);
      };

      // Default response
      let botResponse = {
        type: 'bot',
        text: '',
        html: ''
      };

      try {
        // Handle successful response with data
        if (data) {
          // Check for HTML response first
          if (data.answer_html) {
            // Format any structured data in the response
            data.answer_html = formatStructuredData(data.answer_html);
            
            // Check if this is a fallback "I can't understand" response
            const fallbackPattern = /can't understand|don't understand|not sure what you mean|don't know/i;
            const isFallbackResponse = fallbackPattern.test(data.answer_html);
            
            if (isFallbackResponse) {
              // Provide more helpful guidance for misunderstood questions
              botResponse.html = `
                <div class="fallback-response">
                  <p>I'm not entirely sure how to respond to that. Could you try:</p>
                  <ul>
                    <li>Rephrasing your question</li>
                    <li>Asking about a specific topic (e.g., "Tell me about cap admission" or "What are the requirements for...")</li>
                    <li>Checking if your question is related to education or academic topics</li>
                  </ul>
                  <p>If you're asking about a specific program or process, please include as many details as possible.</p>
                </div>
              `;
              console.log('Handled fallback response with guidance');
            } else {
              botResponse.html = data.answer_html;
              console.log('Using answer_html from response');
            }
          } 
          // Then check for other possible response formats
          else if (data.message) {
            botResponse.text = data.message;
            console.log('Using message from response');
          } else if (data.answer) {
            botResponse.text = data.answer;
            console.log('Using answer from response');
          } else if (data.response) {
            botResponse.text = data.response;
            console.log('Using response from response');
          } 
          // If no known format, try to extract any text from the response
          else {
            const responseText = Object.entries(data)
              .filter(([_, value]) => value && typeof value === 'string')
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n')
              .trim();
            
            if (responseText) {
              botResponse.text = responseText;
            } else {
              botResponse.text = 'I received your message: ' + inputMessage;
            }
            console.log('Using extracted text from response');
          }
        } else {
          botResponse.text = 'I received your message but got an empty response from the server.';
          console.log('Empty response from server');
        }
      } catch (error) {
        console.error('Error processing response:', error);
        botResponse.text = 'I encountered an error processing the response.';
      }
      
      // Final fallback if we still don't have any content
      if (!botResponse.text && !botResponse.html) {
        botResponse.text = 'I received your message but had trouble formulating a response.';
        console.log('Using fallback message');
      }

      setMessages((prev) => [...prev, botResponse]);
      scrollToBottom(); // Scroll after bot response
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Log detailed error information
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
      } else {
        // Error in request setup
        console.error('Error message:', error.message);
      }

      // Determine user-friendly error message based on error type
      let messageText = 'Sorry, I encountered an error processing your message.';
      
      // Handle specific HTTP status codes
      if (error.response) {
        const status = error.response.status;
        
        if (status === 502) {
          messageText = 'The server is currently unavailable. This might be due to maintenance or high traffic. Please try again in a few minutes.';
        } else if (status === 401) {
          messageText = 'Authentication error. Please refresh the page and try again.';
        } else if (status === 404) {
          messageText = 'The requested resource was not found. The endpoint may be incorrect.';
        } else if (status >= 500) {
          messageText = 'Server error. Our team has been notified. Please try again later.';
        } else if (status >= 400) {
          messageText = 'There was a problem with your request. Please check your input and try again.';
        }
      } 
      // Handle network-related errors
      else if (error.code === 'ECONNABORTED' || error.name === 'AbortError' || axios.isCancel(error) || error.code === 'ERR_CANCELED') {
        console.log('Request was canceled or timed out:', error);
        // Don't show an error message for canceled requests (like when component unmounts)
        if (error.message !== 'canceled' && error.message !== 'Request aborted') {
          messageText = 'The request took too long to complete. Please try again. The server might be experiencing high traffic.';
        } else {
          // If it's a deliberate cancellation, don't show an error
          return;
        }
      } 
      else if (error.message?.includes('Network')) {
        messageText = 'Network error. Please check your internet connection and try again. If the problem persists, the server might be down.';
      } 
      // Handle CORS errors
      else if (error.message?.includes('CORS') || error.message?.includes('cross-origin')) {
        messageText = 'A cross-origin error occurred. Please try refreshing the page or contact support if the issue continues.';
      }
      
      // Add a suggestion to retry
      messageText += ' If the problem persists, please try again in a few minutes.';

      const errorMessage = {
        type: 'bot',
        text: messageText,
      };

      setMessages((prev) => [...prev, errorMessage]);
      scrollToBottom(); // Scroll after error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer>
      <GradientBox sx={{ py: 1.5 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1.5}>
            <AvatarGlow
              src={`${CONFIG.assetsDir}/assets/edugen.png`}
              alt="EDUGEN"
              sx={{
                width: 37,
                height: 33,
                boxShadow: '0 0 15px rgba(0, 150, 255, 0.7)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                letterSpacing: 1.1,
                background: 'linear-gradient(90deg, #0072ff 0%, #00c6ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              EDUGEN
            </Typography>
          </Box>
        </Box>
      </GradientBox>

      <MessagesContainer>
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <AnimatedMessageBubble
                key={`${index}-${message.text}`}
                type={message.type}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 180,
                }}
              >
                {/* <Typography variant="body1">{message.text}</Typography> */}
                {message.html ? (
                  <div dangerouslySetInnerHTML={{ __html: message.html }} />
                ) : message.text ? (
                  <p>{message.text}</p>
                ) : null}
              </AnimatedMessageBubble>
            ))}
            {loading && (
              <AnimatedMessageBubble
                type="bot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <CircularProgress size={20} color="inherit" />
                  <Typography variant="body1">Thinking...</Typography>
                </Box>
              </AnimatedMessageBubble>
            )}
          </AnimatePresence>
        </LazyMotion>
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <Box display="flex" gap={2} alignItems="flex-end">
          <TextField
            fullWidth
            multiline
            maxRows={4}
            minRows={1}
            size="medium"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '& fieldset': {
                  border: 'none',
                },
                '& textarea': {
                  maxHeight: '120px',
                  overflowY: 'auto !important',
                },
              },
            }}
          />
          <SendButton onClick={handleSend} disabled={!inputMessage.trim() || loading}>
            <Iconify icon="mdi:send" width={24} />
          </SendButton>
        </Box>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatbotWidget;
