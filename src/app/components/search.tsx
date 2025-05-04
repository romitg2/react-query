'use client';

interface SearchBoxProps {
    value?: string;
    placeholder?: string;
    className?: string;
    onChange?: (value: string) => void;
}


export function SearchBox({value = "", placeholder = "Search", className = "", onChange}: SearchBoxProps) {
    return (
        <div className="flex items-center">
            <input className={`border border-gray-300 rounded p-2 w-full ${className}`} placeholder={placeholder} type="text" value={value} onChange={(e) => onChange?.(e.target.value)} />
        </div>
    )
}