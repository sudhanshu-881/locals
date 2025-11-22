-- Function to get user conversations
CREATE OR REPLACE FUNCTION get_user_conversations() 
RETURNS TABLE (
    conversation_id UUID,
    other_user_id UUID,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    last_message TEXT,
    last_message_at TIMESTAMPTZ,
    unread_count BIGINT
)
AS $$
BEGIN
    RETURN QUERY
    WITH user_convos AS (
        SELECT 
            id as convo_id,
            CASE 
                WHEN user_id = auth.uid() THEN provider_id
                ELSE user_id 
            END as other_user
        FROM conversations
        WHERE user_id = auth.uid() OR provider_id = auth.uid()
    )
    SELECT 
        uc.convo_id,
        uc.other_user,
        p.first_name,
        p.last_name,
        p.avatar_url,
        (SELECT content FROM messages WHERE conversation_id = uc.convo_id ORDER BY created_at DESC LIMIT 1),
        (SELECT created_at FROM messages WHERE conversation_id = uc.convo_id ORDER BY created_at DESC LIMIT 1),
        (SELECT COUNT(*) FROM messages WHERE conversation_id = uc.convo_id AND receiver_id = auth.uid() AND is_read = FALSE)
    FROM user_convos uc
    JOIN profiles p ON p.id = uc.other_user
    ORDER BY (SELECT created_at FROM messages WHERE conversation_id = uc.convo_id ORDER BY created_at DESC LIMIT 1) DESC;
END;
$$ LANGUAGE plpgsql;
