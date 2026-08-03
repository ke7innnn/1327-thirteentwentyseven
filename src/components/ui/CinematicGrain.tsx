"use client";

export default function CinematicGrain() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.025] hidden md:block bg-repeat mix-blend-overlay"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23808080'/%3E%3C/svg%3E")`,
            }}
        />
    );
}
