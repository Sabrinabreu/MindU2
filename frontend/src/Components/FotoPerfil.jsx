import React from 'react';

const ProfilePicture = ({ name, src, style }) => {
    const getInitials = (name) => {
        if (!name) return '';
        const names = name.trim().split(' ').filter(Boolean);
        return names.length > 0 ? names.slice(0, 2).map(n => n[0].toUpperCase()).join('') : '';
    };

    const getColorFromInitials = (initials) => {
        let hash = 0;
        for (let i = 0; i < initials.length; i++) {
            hash = initials.charCodeAt(i) + ((hash << 5) - hash);
        }
        return `#${((hash & 0x00FFFFFF) >> 0).toString(16).padStart(6, '0').toUpperCase()}`;
    };

    const initials = getInitials(name);
    const backgroundColor = getColorFromInitials(initials);
    const textColor = backgroundColor ? 
        (parseInt(backgroundColor.substring(1, 3), 16) * 0.299 + 
         parseInt(backgroundColor.substring(3, 5), 16) * 0.587 + 
         parseInt(backgroundColor.substring(5, 7), 16) * 0.114 > 186 ? '#000' : '#FFF') : '#000';

    return (
        src ? (
            <img
                src={src}
                alt={name}
                className="profile-image"
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    ...style, // Estilos personalizados
                }}
            />
        ) : (
            <div
                className="profile-initials"
                style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                    width: '150px',
                    height: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    fontSize: '3em',
                    fontWeight: 'bold',
                    ...style, // Estilos personalizados
                }}
            >
                {initials}
            </div>
        )
    );
};

export default ProfilePicture;