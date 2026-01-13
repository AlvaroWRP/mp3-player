import { useRef } from 'react';

export function useAudioElement() {
    return useRef<HTMLAudioElement>(new Audio());
}
