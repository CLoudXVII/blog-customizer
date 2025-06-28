import { useEffect, useCallback } from 'react';

type useCloseProps = {
	isOpen: boolean;
	containerRef: React.RefObject<HTMLElement>;
	onClose: () => void;
};

export function useClose({ isOpen, containerRef, onClose }: useCloseProps) {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const { target } = event;

			const isOutsideClick =
				target instanceof Node &&
				containerRef.current &&
				!containerRef.current.contains(target);

			if (isOutsideClick) {
				onClose();
			}
		},
		[onClose, containerRef]
	);

	const handleEscape = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleEscape, handleClickOutside]);
}
